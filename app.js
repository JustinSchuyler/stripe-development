const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const stripe = require("stripe")("sk_test_2HkYzFImOSrI76MneAxB5ccs");

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
      receipt_email: 'x@orthofi.com',
      description: "We'll give you your $100,000 back if you give us Toothy... NOW!"
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

app.listen(port, () => console.log(`Server running on port ${port}`));