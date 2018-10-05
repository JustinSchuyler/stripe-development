const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const port = 3000;
const stripe = require("stripe")("sk_test_2HkYzFImOSrI76MneAxB5ccs");
const targetCustomer = {
  id: 'cus_Dj5vY3ceud6iJL',
  email: 'josh.rocha@orthofi.com'
}

app.use(cors());
app.use(bodyParser.json());

app.post('/connection-token', (req, res) => {
    const token = stripe.terminal.connectionTokens.create({});
    token.then((data) => {
        console.log(data);
        res.json(data);
    });
});

app.post('/payment-intent', (req, res) => {
  const amount = req.body.amount * 100;

  stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      allowed_source_types: ['card_present'],
      capture_method: 'manual',
      receipt_email: targetCustomer.email,
      description: "Thank you for your purchase with Always Smiling!",
      // save_source_to_customer: true,
      customer: targetCustomer.id
  }, function(err, paymentIntent) {
      // asynchronously called
      console.log('error:', err);
      res.json(paymentIntent);
  });
});

app.post('/complete-payment', (req, res) => {
    const paymentIntentId = req.body.paymentIntentId;

    stripe.paymentIntents.retrieve(paymentIntentId).then((paymentIntent) => {
      stripe.paymentIntents.capture(paymentIntent.id, (err, response) => {
        console.log('success');
        res.json({ message: 'Success! Took yo money', paymentIntentId: paymentIntentId });
      });
    });
});

app.post('/customer', async (req, res) => {
  const customer = await stripe.customers.create({
    source: 'tok_mastercard',
    email: targetCustomer.email
  });

  res.json({ customer: customer });
});

app.get('/customer/:id', async (req, res) => {
  const customer = await stripe.customers.retrieve(req.params.id);
  res.json(customer);
});

app.post('/charge', async (req, res) => {
  console.log('charge this:', req.body);
  const amount = req.body.amount * 100;
  const customerId = req.body.customerId;
  const sourceId = req.body.sourceId;

  const charge = await stripe.charges.create({
    amount: amount,
    currency: 'usd',
    receipt_email: targetCustomer.email,
    description: "Thank you for your purchase with Always Smiling!",
    customer: customerId,//'cus_Dj5vY3ceud6iJL',
    source: sourceId//'src_1DHeX6FQHroPf6w9Pk3h4XnV'
  });
  res.json(charge);
});

// app.post('/attach-source', async (req, res) => {
//   const source = stripe.customers.createSource('cus_Dj5vY3ceud6iJL', { source: 'src_1DHeX6FQHroPf6w9Pk3h4XnV' });
//   res.json(source);
// });

app.get('/source/:id', async (req, res) => {
  const source = await stripe.sources.retrieve(req.params.id);
  res.json(source);
})

app.post('/detach-source/:sourceId', async (req, res) => {
  console.log(`Detach ${req.params.sourceId} from ${targetCustomer.id}`);
  const source = await stripe.customers.deleteSource(
    targetCustomer.id,
    req.params.sourceId
    // 'src_1DHvnQFQHroPf6w9HdJrq9ej'
    // 'src_1DHtvjFQHroPf6w9Rnn670Nj'
    // 'src_1DHjkfFQHroPf6w9ClHoD2lw'
    // sourceId
    // 'src_1DHeX6FQHroPf6w9Pk3h4XnV'
  );
  res.json(source);
})

app.post('/curl', (req, res) => {
  console.log(req);
  res.send('ok');
});

app.post('/attach-source', async (req, res) => {
  // console.log(req.body);
  console.log('customerid', req.body.customerId);
  console.log('sourceid:', req.body.paymentSourceId);

  request({
    method: 'POST',
    uri: 'https://sk_test_2HkYzFImOSrI76MneAxB5ccs:@api.stripe.com/v1/sources',
    form: "type=card&card[card_present_source]="+req.body.paymentSourceId
    // multipart: [{
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   body: 
    // }]
  }, async function (error, response, body) {
    const newSource = JSON.parse(body);
    console.log('new', newSource);
    console.log('newSourceId:', newSource.id);

    const source = await stripe.customers.createSource(req.body.customerId, { source: newSource.id });
    console.log('newSource:', source);
    res.json(source);
  });



  // console.log(newSourceId);
  // res.send();
  // const source = await stripe.customers.createSource(req.body.customerId, { source: newSourceId });
  // res.json(source);
});

app.listen(port, () => console.log(`Server running on port ${port}`));