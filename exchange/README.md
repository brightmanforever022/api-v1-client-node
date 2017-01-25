# Blockchain ExchangeRates Module

Get this current bitcoin exchange rates. [View full API documentation](https://blockchain.info/api/exchange_rates_api).

## Importing

```js
var exchange = require('blockchain.info/exchange');
```

## Methods

All method options can include an `apiCode` property to prevent hitting request limits.

### getTicker

Usage:

```js
exchange.getTicker(options);
```

Gets the market price of BTC compared to world currencies. Without any options specified, it responds with a JSON object that has currency codes as keys.

Options (optional):

  * `currency` - specify which currency to get data for (currency code, *string*)

### fromBTC

Usage:

```js
exchange.fromBTC(amount, time, currency, options);
```

Gets the historical market price of the requested BTC amount at the requested time. Responds with the value in *string* format.

Parameters:

  * `amount` - the amount of BTC  (satoshi, *number*)
  * `time` - the historical date (milliseconds since Unix epoch, *number*)
  * `currency` - the code of the currency to convert from (currency code, *string*)

### toBTC

Usage:

```js
exchange.toBTC(amount, options);
```

Converts an amount of a given currency to BTC. Responds with a number in *string* format.

Parameters:

  * `amount` - the amount to convert (satoshi, *number*)
  * `currency` - the code of the currency to convert from (currency code, *string*)
