const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const stripe = require("stripe")("sk_test_2HkYzFImOSrI76MneAxB5ccs");

app.use(cors());

app.post('/connection-token', (req, res) => {
    const token = stripe.terminal.connectionTokens.create({});
    token.then((data) => {
        console.log(data);
        res.json(data);
    });
});

app.listen(port, () => console.log(`Server running on port ${port}`));