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
    stripe.paymentIntents.create({
        amount: 100,
        currency: 'usd',
        allowed_source_types: ['card_present'],
        capture_method: 'manual',
    }, function(err, paymentIntent) {
        // asynchronously called
        if (err) res.json({ err });
        console.log(paymentIntent);
        res.json(paymentIntent);
    });
});

app.post('/complete-payment', (req, res) => {
    const paymentIntentId = req.body.paymentIntentId;
    const paymentIntent = stripe.payment_intent.retrieve(paymentIntentId);
    paymentIntent.capture();
    res.json({ message: 'Success! Took yo money' });
});

app.listen(port, () => console.log(`Server running on port ${port}`));