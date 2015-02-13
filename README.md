#Blockchain API Library (Node, v1)

An official Node module for interacting with the Blockchain.info API.

###Getting started

Installation via NPM:

```
$ npm install blockchain.info
```

```
var blockchain = require('blockchain.info');
```

###Callback functions

Callback functions are passed two parameters:

* An **error** parameter (*string* or *null*) in the event that an error occurs
* A **data** parameter (*json object, unless stated otherwise*) carrying the response

Example:

```
var callback = function(error, data) { // Do something };
```

###Documentation

This module consists of these sub-modules:

* ```MyWallet``` ([docs](./docs/MyWallet.md)) ([MyWallet API][my_wallet_api])
* ```CreateWallet``` ([docs](./docs/CreateWallet.md)) ([CreateWallet API][create_wallet_api])
* ```exchangerates``` ([docs](./docs/ExchangeRates.md)) ([Exchange Rates API][exchange_rates_api])
* ```statistics``` ([docs](./docs/Statistics.md)) ([Statistics API][statistics_api])
* ```pushtx``` ([docs](./docs/pushtx.md)) ([pushtx][pushtx])



[my_wallet_api]: https://blockchain.info/api/blockchain_wallet_api
[create_wallet_api]: https://blockchain.info/api/create_wallet
[exchange_rates_api]: https://blockchain.info/api/exchange_rates_api
[statistics_api]: https://blockchain.info/api/charts_api
[pushtx]: https://blockchain.info/pushtx