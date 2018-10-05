curl https://api.stripe.com/v1/terminal/readers -u sk_test_2HkYzFImOSrI76MneAxB5ccs: -d registration_code="marble-canary-ecru" -d label="OrthoFi R4J"
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   348  100   291  100    57    477     93 --:--:-- --:--:-- --:--:--   571{
  "id": "ds_P400-275-177-383",
  "object": "terminal.reader",
  "device_sw_version": "3.0.0.0",
  "device_type": "verifone_P400",
  "ip_address": "192.168.129.96",
  "label": "OrthoFi R4J",
  "location": "st_acct_1D6nEeFQHroPf6w9",
  "serial_number": "275-177-383",
  "status": "online"
}

curl https://api.stripe.com/v1/terminal/readers   -u sk_test_2HkYzFImOSrI76MneAxB5ccs:

// stripe.payment_intent is undefined
    // capture is a method on stripe.paymentIntents, not a method on a PaymentIntent

    https://stripe.com/docs/receipts

    {
    "customer": {
        "id": "cus_Dj5vY3ceud6iJL",
        "object": "customer",
        "account_balance": 0,
        "created": 1538686078,
        "currency": null,
        "default_source": "card_1DHdjmFQHroPf6w901hfOIsq",
        "delinquent": false,
        "description": null,
        "discount": null,
        "email": "josh.rocha@orthofi.com",
        "invoice_prefix": "F510BDE",
        "livemode": false,
        "metadata": {},
        "shipping": null,
        "sources": {
            "object": "list",
            "data": [
                {
                    "id": "card_1DHdjmFQHroPf6w901hfOIsq",
                    "object": "card",
                    "address_city": null,
                    "address_country": null,
                    "address_line1": null,
                    "address_line1_check": null,
                    "address_line2": null,
                    "address_state": null,
                    "address_zip": null,
                    "address_zip_check": null,
                    "brand": "MasterCard",
                    "country": "US",
                    "customer": "cus_Dj5vY3ceud6iJL",
                    "cvc_check": null,
                    "dynamic_last4": null,
                    "exp_month": 10,
                    "exp_year": 2019,
                    "fingerprint": "2VsoFbjXJfGxyARs",
                    "funding": "credit",
                    "last4": "4444",
                    "metadata": {},
                    "name": null,
                    "tokenization_method": null
                }
            ],
            "has_more": false,
            "total_count": 1,
            "url": "/v1/customers/cus_Dj5vY3ceud6iJL/sources"
        },
        "subscriptions": {
            "object": "list",
            "data": [],
            "has_more": false,
            "total_count": 0,
            "url": "/v1/customers/cus_Dj5vY3ceud6iJL/subscriptions"
        },
        "tax_info": null,
        "tax_info_verification": null
    }
}


{
    "id": "src_1DHdzgFQHroPf6w9jMgR1Vfa",
    "object": "source",
    "amount": null,
    "card_present": {
        "read_method": "contactless_emv",
        "brand": "Visa",
        "country": "US",
        "exp_month": 12,
        "exp_year": 2022,
        "fingerprint": "EWifIm0Q5yLaQ9td",
        "funding": "credit",
        "last4": "9969",
        "emv_auth_data": "8A023030",
        "authorization_code": null,
        "application_cryptogram": "22C6C2FC5D264592",
        "transaction_status_information": "0000",
        "dedicated_file_name": "A0000000031010",
        "application_preferred_name": "Stripe Credit",
        "terminal_verification_results": "0000000000",
        "authorization_response_code": "3030",
        "cvm_type": "none",
        "data_type": null,
        "evidence_transaction_certificate": null,
        "evidence_customer_signature": null,
        "reader": null,
        "pos_device_id": null
    },
    "client_secret": "src_client_secret_Dj6CLwvLIyR2DgB2aEi0nm1X",
    "created": 1538687064,
    "currency": null,
    "flow": "none",
    "livemode": false,
    "metadata": {},
    "owner": {
        "address": null,
        "email": null,
        "name": null,
        "phone": null,
        "verified_address": null,
        "verified_email": null,
        "verified_name": null,
        "verified_phone": null
    },
    "statement_descriptor": null,
    "status": "consumed",
    "type": "card_present",
    "usage": "single_use"
}






curl https://api.stripe.com/v1/sources \
> -u sk_test_2HkYzFImOSrI76MneAxB5ccs: \
> -d type=card \
> -d card[card_present_source]="src_1DHdzgFQHroPf6w9jMgR1Vfa"
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1008  100   944  100    64   1342     91 --:--:-- --:--:-- --:--:--  1433{
  "id": "src_1DHeX6FQHroPf6w9Pk3h4XnV",
  "object": "source",
  "amount": null,
  "card": {
    "brand": "Visa",
    "country": "US",
    "exp_month": 12,
    "exp_year": 2022,
    "fingerprint": "EWifIm0Q5yLaQ9td",
    "funding": "credit",
    "last4": "9969",
    "three_d_secure": "optional",
    "name": null,
    "address_line1_check": null,
    "address_zip_check": null,
    "cvc_check": null,
    "tokenization_method": null,
    "dynamic_last4": null
  },
  "client_secret": "src_client_secret_Dj6k4WLmsU9d2MX8QG6aUG3q",
  "created": 1538689136,
  "currency": null,
  "flow": "none",
  "livemode": false,
  "metadata": {
  },
  "owner": {
    "address": null,
    "email": null,
    "name": null,
    "phone": null,
    "verified_address": null,
    "verified_email": null,
    "verified_name": null,
    "verified_phone": null
  },
  "statement_descriptor": null,
  "status": "chargeable",
  "type": "card",
  "usage": "reusable"
}



given: account X matches customer Y

onload:
    pull up sources for Y
    select a source or new source

if source selected:
    charge amount to customer/source

if not:
    collect payment
    convert payment source to rechargable source
    attach to Y

Script:
Opening screen has cart with downpayment, adhoc options
select any adhocs
checkout
select payment method (saved method empty), choose stripe
loading modal while payment captured
success confirmation
would you like to save? yes
return to adhoc page (no downpayment)
select something else
checkout
select payment method (saved is populated with card)
choose saved card
success confirmation

fun bits:
signed in as DT, we got his card somehow
put something expensive on the menu
toothy will be on the device and loading










{ on: [Function: bound addListener],
  off: [Function: bound removeListener],
  _api:
   { auth: 'Bearer sk_test_2HkYzFImOSrI76MneAxB5ccs',
     host: 'api.stripe.com',
     port: '443',
     basePath: '/v1/',
     version: null,
     timeout: 120000,
     agent: null,
     dev: false },
  account:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: '',
     path: [Function] },
  accounts:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: '',
     path: [Function] },
  applePayDomains:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'apple_pay/domains',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     del: [Function] },
  applicationFees:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'application_fees',
     path: [Function],
     list: [Function],
     retrieve: [Function] },
  balance:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'balance',
     path: [Function] },
  bitcoinReceivers:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'bitcoin/receivers',
     path: [Function],
     list: [Function],
     retrieve: [Function],
     getMetadata: [Function: getMetadata] },
  charges:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'charges',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function],
     setMetadata: [Function: setMetadata],
     getMetadata: [Function: getMetadata] },
  countrySpecs:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'country_specs',
     path: [Function],
     list: [Function],
     retrieve: [Function] },
  coupons:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'coupons',
     path: [Function],
     create: [Function],
     list: [Function],
     update: [Function],
     retrieve: [Function],
     del: [Function] },
  customers:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'customers',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function],
     del: [Function],
     setMetadata: [Function: setMetadata],
     getMetadata: [Function: getMetadata] },
  disputes:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'disputes',
     path: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function],
     setMetadata: [Function: setMetadata],
     getMetadata: [Function: getMetadata] },
  ephemeralKeys:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'ephemeral_keys',
     path: [Function],
     del: [Function] },
  events:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'events',
     path: [Function],
     list: [Function],
     retrieve: [Function] },
  exchangeRates:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'exchange_rates',
     path: [Function],
     list: [Function],
     retrieve: [Function] },
  files:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'files',
     path: [Function] },
  fileLinks:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'file_links',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function],
     setMetadata: [Function: setMetadata],
     getMetadata: [Function: getMetadata] },
  invoiceItems:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'invoiceitems',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function],
     del: [Function],
     setMetadata: [Function: setMetadata],
     getMetadata: [Function: getMetadata] },
  invoices:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'invoices',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function] },
  issuerFraudRecords:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'issuer_fraud_records',
     path: [Function],
     list: [Function],
     retrieve: [Function] },
  loginLinks:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'accounts/{accountId}/login_links',
     path: [Function],
     create: [Function] },
  orderReturns:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'order_returns',
     path: [Function],
     list: [Function],
     retrieve: [Function] },
  orders:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'orders',
     path: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function] },
  paymentIntents:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'payment_intents',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function] },
  payouts:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'payouts',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function],
     setMetadata: [Function: setMetadata],
     getMetadata: [Function: getMetadata] },
  plans:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'plans',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function],
     del: [Function] },
  products:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'products',
     path: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function],
     del: [Function] },
  recipientCards:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'recipients/{recipientId}/cards',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function],
     del: [Function] },
  recipients:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'recipients',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function],
     del: [Function],
     setMetadata: [Function: setMetadata],
     getMetadata: [Function: getMetadata] },
  refunds:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'refunds',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function] },
  skus:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'skus',
     path: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function],
     del: [Function] },
  sources:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'sources',
     path: [Function],
     create: [Function],
     retrieve: [Function],
     update: [Function],
     setMetadata: [Function: setMetadata],
     getMetadata: [Function: getMetadata] },
  subscriptionItems:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'subscription_items',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function],
     del: [Function] },
  subscriptions:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'subscriptions',
     path: [Function],
     list: [Function],
     retrieve: [Function],
     del: [Function] },
  threeDSecure:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: '3d_secure',
     path: [Function],
     create: [Function],
     retrieve: [Function] },
  tokens:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'tokens',
     path: [Function],
     create: [Function],
     retrieve: [Function] },
  topups:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'topups',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function],
     setMetadata: [Function: setMetadata],
     getMetadata: [Function: getMetadata] },
  transfers:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'transfers',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function],
     setMetadata: [Function: setMetadata],
     getMetadata: [Function: getMetadata] },
  usageRecords:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'subscription_items',
     path: [Function] },
  usageRecordSummaries:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'subscription_items',
     path: [Function] },
  applicationFeeRefunds:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'application_fees/{feeId}/refunds',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function] },
  chargeRefunds:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'charges/{chargeId}/refunds',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function] },
  customerCards:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'customers/{customerId}/cards',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function],
     del: [Function] },
  customerSubscriptions:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'customers/{customerId}/subscriptions',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function],
     del: [Function] },
  transferReversals:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'transfers/{transferId}/reversals',
     path: [Function],
     create: [Function],
     list: [Function],
     retrieve: [Function],
     update: [Function] },
  issuing:
   ResourceNamespace {
     authorizations:
      { _stripe: [Circular],
        _urlData: {},
        basePath: [Function],
        resourcePath: 'issuing/authorizations',
        path: [Function],
        list: [Function],
        retrieve: [Function],
        update: [Function],
        setMetadata: [Function: setMetadata],
        getMetadata: [Function: getMetadata] },
     cardholders:
      { _stripe: [Circular],
        _urlData: {},
        basePath: [Function],
        resourcePath: 'issuing/cardholders',
        path: [Function],
        create: [Function],
        list: [Function],
        retrieve: [Function],
        update: [Function],
        setMetadata: [Function: setMetadata],
        getMetadata: [Function: getMetadata] },
     cards:
      { _stripe: [Circular],
        _urlData: {},
        basePath: [Function],
        resourcePath: 'issuing/cards',
        path: [Function],
        create: [Function],
        list: [Function],
        retrieve: [Function],
        update: [Function],
        setMetadata: [Function: setMetadata],
        getMetadata: [Function: getMetadata] },
     disputes:
      { _stripe: [Circular],
        _urlData: {},
        basePath: [Function],
        resourcePath: 'issuing/disputes',
        path: [Function],
        create: [Function],
        list: [Function],
        retrieve: [Function],
        update: [Function],
        setMetadata: [Function: setMetadata],
        getMetadata: [Function: getMetadata] },
     transactions:
      { _stripe: [Circular],
        _urlData: {},
        basePath: [Function],
        resourcePath: 'issuing/transactions',
        path: [Function],
        list: [Function],
        retrieve: [Function],
        update: [Function],
        setMetadata: [Function: setMetadata],
        getMetadata: [Function: getMetadata] } },
  reporting:
   ResourceNamespace {
     reportRuns:
      { _stripe: [Circular],
        _urlData: {},
        basePath: [Function],
        resourcePath: 'reporting/report_runs',
        path: [Function],
        create: [Function],
        list: [Function],
        retrieve: [Function] },
     reportTypes:
      { _stripe: [Circular],
        _urlData: {},
        basePath: [Function],
        resourcePath: 'reporting/report_types',
        path: [Function],
        list: [Function],
        retrieve: [Function] } },
  sigma:
   ResourceNamespace {
     scheduledQueryRuns:
      { _stripe: [Circular],
        _urlData: {},
        basePath: [Function],
        resourcePath: 'sigma/scheduled_query_runs',
        path: [Function],
        list: [Function],
        retrieve: [Function] } },
  terminal:
   ResourceNamespace {
     connectionTokens:
      { _stripe: [Circular],
        _urlData: {},
        basePath: [Function],
        resourcePath: 'terminal/connection_tokens',
        path: [Function],
        create: [Function] },
     locations:
      { _stripe: [Circular],
        _urlData: {},
        basePath: [Function],
        resourcePath: 'terminal/locations',
        path: [Function],
        create: [Function],
        list: [Function],
        retrieve: [Function],
        update: [Function] },
     readers:
      { _stripe: [Circular],
        _urlData: {},
        basePath: [Function],
        resourcePath: 'terminal/readers',
        path: [Function],
        create: [Function],
        list: [Function],
        retrieve: [Function],
        update: [Function] } },
  fileUploads:
   { _stripe: [Circular],
     _urlData: {},
     basePath: [Function],
     resourcePath: 'files',
     path: [Function] },
  errors:
   { [Function: _Error]
     extend: [Function: protoExtend],
     StripeError: { [Function] extend: [Function: protoExtend], generate: [Function] },
     StripeCardError: { [Function] extend: [Function: protoExtend], generate: [Function] },
     StripeInvalidRequestError: { [Function] extend: [Function: protoExtend], generate: [Function] },
     StripeAPIError: { [Function] extend: [Function: protoExtend], generate: [Function] },
     StripeAuthenticationError: { [Function] extend: [Function: protoExtend], generate: [Function] },
     StripePermissionError: { [Function] extend: [Function: protoExtend], generate: [Function] },
     StripeRateLimitError: { [Function] extend: [Function: protoExtend], generate: [Function] },
     StripeConnectionError: { [Function] extend: [Function: protoExtend], generate: [Function] },
     StripeSignatureVerificationError: { [Function] extend: [Function: protoExtend], generate: [Function] },
     StripeIdempotencyError: { [Function] extend: [Function: protoExtend], generate: [Function] } },
  webhooks:
   { DEFAULT_TOLERANCE: 300,
     constructEvent: [Function: constructEvent],
     signature:
      { EXPECTED_SCHEME: 'v1',
        _computeSignature: [Function: _computeSignature],
        verifyHeader: [Function: verifyHeader] } } }
