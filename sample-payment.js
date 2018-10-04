var stripe = require("stripe")("sk_test_2HkYzFImOSrI76MneAxB5ccs");

const charge = stripe.charges.create({
  amount: 75,
  currency: 'usd',
  source: 'tok_visa',
  receipt_email: 'justin.schuyler@orthofi.com',
});

charge.then(result => console.log(result));
