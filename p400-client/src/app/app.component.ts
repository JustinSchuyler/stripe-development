import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  terminal: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.terminal = (<any>window).StripeTerminal.create({
      onFetchConnectionToken: this.fetchConnectionToken
    });
    var configuration = {method: 'simulated'}
    this.terminal.discoverReaders(configuration).then(this.handleDiscovery.bind(this));
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


    if (confirmResult.error) {
        console.log("Confirm failed: " + confirmResult.error.message);
    } else if (confirmResult.paymentIntent) {
        // Notify your backend to capture the PaymentIntent
        this.completePayment(confirmResult.paymentIntent.id)
        .then(() => {
          fetch('http://localhost:3000/attach-source', {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json; charset=utf-8"
              },
              body: JSON.stringify({ paymentSourceId, customerId: 'cus_Dj5vY3ceud6iJL' })
          })
          .then((response) => response.json())
          .then((data) => console.log(data));

          // fetch('https://api.stripe.com/v1/sources', {
          //     method: 'POST',
          //     headers: {
          //         "Content-Type": "application/json; charset=utf-8",
          //         "Authorization": 'Basic ' + btoa('sk_test_2HkYzFImOSrI76MneAxB5ccs:')
          //     },
          //     body: JSON.stringify({
          //       type: 'card',
          //       "card[card_present_source]": paymentSourceId
          //     })
          // })
          // .then((response) => response.json())
          // .then((data) => {
          //   console.log(data);
          // });
        });
    }
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

  charge(amount: number, saveCard: boolean) {
    this.fetchPaymentIntent(amount).then(this.handlePaymentIntent.bind(this));
  }
}
