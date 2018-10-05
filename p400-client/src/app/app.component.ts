import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { additionalItems } from './additionalItems';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  terminal: any;
  additionalItems = additionalItems;
  loading: boolean = false;
  downpayment: number = 825;
  page: string = 'cart';
  confirmResult;
  customerId: string = 'cus_Dj5vY3ceud6iJL';
  newSource;
  state;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.terminal = (<any>window).StripeTerminal.create({
      onFetchConnectionToken: this.fetchConnectionToken
    });
    // var configuration = {method: 'simulated'}
    this.terminal.discoverReaders().then(this.handleDiscovery.bind(this));
  }

  payWithStripe(amount: number) {
    this.loading = true;
    this.charge(amount);
  }

  getSelectedItems() {
    return this.additionalItems.filter(x => x.selected);
  }

  getCartTotal(): number {
    return additionalItems
            .filter(x => x.selected)
            .map(x => x.cost)
            .reduce((a, c) => a + c, 0);
  }

  fetchConnectionToken() {
    return fetch('http://localhost:3000/connection-token', { method: 'POST' })
            .then((response) => response.json())
            .then((data) => data.secret);
  }

  handleDiscovery(discoverResult) {
    if (discoverResult.error) {
        console.log('Failed to discover: ', discoverResult.error);
    } else if (discoverResult.discoveredReaders.length === 0) {
        console.log('No available readers.');
    } else {
        // You should show the list of discoveredReaders to the
        // cashier here and let them select which to connect to (see below).
        console.log('Connect to reader:', discoverResult);
        this.connectReader(discoverResult);
    }
  }

  connectReader(discoverResult) {
    // Just select the first reader here.
    var selectedReader = discoverResult.discoveredReaders[0];

    this.terminal.connectReader(selectedReader).then(function(connectResult) {
        if (connectResult.error) {
            console.log('Failed to connect: ', connectResult.error);
        } else {
            console.log('Connected to reader: ', connectResult.connection.reader.label);
        }
    });
  }

  fetchPaymentIntent(amount: number) {
    return fetch('http://localhost:3000/payment-intent', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ amount })
    })
    .then((response) => response.json())
    .then((data) => data.client_secret);
  }

  handlePaymentConfirmation(confirmResult) {
    console.log('confirm result:', confirmResult);
    const paymentSourceId = confirmResult.paymentIntent.source.id;
    console.log('paymentSourceId', paymentSourceId);
    this.confirmResult = confirmResult;

    if (confirmResult.error) {
        console.log("Confirm failed: " + confirmResult.error.message);
    } else if (confirmResult.paymentIntent) {
        // Notify your backend to capture the PaymentIntent
        this.completePayment(confirmResult.paymentIntent.id)
        .then(() => {
          this.loading = false;
          this.page = 'confirmation';
        });
        // .then(() => {
          // Store the paymentSourceId so it can be converted + attached at a later step pending user approval
          // fetch('http://localhost:3000/attach-source', {
          //     method: 'POST',
          //     headers: {
          //         "Content-Type": "application/json; charset=utf-8"
          //     },
          //     body: JSON.stringify({ paymentSourceId, customerId: 'cus_Dj5vY3ceud6iJL' })
          // })
          // .then((response) => response.json())
          // .then((data) => console.log(data));
        // });
    }
}

saveCard() {
  return fetch('http://localhost:3000/attach-source', {
          method: 'POST',
          headers: {
              "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify({ paymentSourceId: this.confirmResult.paymentIntent.source.id, customerId: this.customerId })
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('new source:', data);
        this.newSource = data;
        this.additionalItems.map(x => x.selected = false);
        this.downpayment = 0;
        this.page = 'cart';
      });
}

  confirmPaymentIntent(paymentIntent) {
    return this.terminal.confirmPaymentIntent(paymentIntent).then(this.handlePaymentConfirmation.bind(this));
  }

  completePayment(paymentIntentId) {
    return fetch('http://localhost:3000/complete-payment', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ paymentIntentId: paymentIntentId })
    })
    .then((response) => response.json());
  }

  handlePaymentMethod(result) {
    console.log('result:', result);
    if (result.error) {
        console.log("Collect payment method failed: " + result.error.message);
    }
    else {
        console.log("Payment method: ", result.paymentIntent.payment_method)
        // Confirm PaymentIntent (see below)
        this.confirmPaymentIntent(result.paymentIntent)
    }
  }

  handlePaymentIntent(clientSecret) {
    this.terminal.collectPaymentMethod(clientSecret).then(this.handlePaymentMethod.bind(this));
  }

  charge(amount: number) {
    if (!this.newSource) {
      this.fetchPaymentIntent(amount).then(this.handlePaymentIntent.bind(this));
    }
    else {
      console.log('pay with:', this.newSource);
      return fetch('http://localhost:3000/charge', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          amount: amount,
          customerId: this.customerId,
          sourceId: this.newSource.id
        })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('charged with existing card:', data);
      this.page = 'confirmation';
      this.state = 'done';
    });
    }
  }
}
