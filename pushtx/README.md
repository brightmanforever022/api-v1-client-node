# Blockchain Push Transaction Module

Importing:

```js
var pushtx = require('blockchain.info/pushtx');
```

## Methods

All method options can include an `apiCode` property to prevent hitting request limits.

### pushtx

Usage:

```
pushtx.pushtx(transaction, options);
```

Manually broadcasts a transaction over the bitcoin network.

Parameters:

  * `transaction` - raw transaction in *hex* format (*string*)
