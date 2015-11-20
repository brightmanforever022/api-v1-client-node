
# Blockchain.info Socket Module

Blockchain data delivered in real-time. [View full API documentation](https://blockchain.info/api/api_websocket).

## Importing

```js
var Socket = require('blockchain.info/socket');
```

## Instantiating

An instance of `Socket` must be instantiated before using it:

```js
var mySocket = new Socket();
```

## Methods

### onOpen

```js
mySocket.onOpen(callback);
```

Parameters:

  * `callback` - function that will be called when the socket is opened

### onClose

```js
mySocket.onClose(callback);
```

Parameters:

  * `callback` - function that will be called when the socket is closed

### onTransaction

```js
mySocket.onTransaction(callback, options);
```

Parameters:

  * `callback` - function that will be called when a new transaction is broadcasted, gets passed a transaction json object

Options (optional):

  * `addresses` - array of bitcoin addresses to watch for new transactions

### onBlock

```js
mySocket.onBlock(callback);
```

Parameters:

  * `callback` - function that will be called when a new block is written to the block chain, gets passed a block json object
