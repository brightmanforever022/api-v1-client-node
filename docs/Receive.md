# Blockchain Receive Module

## Creating a receiving address

An instance of Receive needs to be initialized before it can be used:

```
var receive = new blockchain.Receive(address, callbackURL [, options]);
```

The Receive class supports method chaining.

Parameters:

* **address**: the address for payments to be forwarded to (*string*)
* **callbackURL**: the url to which the callback should be sent (*string*)

Options (optional):

* **apiCode**: api code, if you have one (*string*)
* **confirmations**: minimum number of confirmations before becoming able to receive callback url (*number*, defaults to 6)

## Methods

### create

Usage:

```
receive.create([parameters,] callback);
```

Creates the input address, which can then forward to the address passed into the constructor.  
Responds with an *object* in the data parameter of the callback.

Parameters:

* **parameters**: any custom parameters to be returned with the callback url go in here (*object*, optional)

Response Object:

* **fee_percent**: percent of transaction taken as fee (*number*)
* **destination**: destination address (*string*)
* **input_address**: the forwarding address (*string*)
* **callback_url**: the callback url (*string*)

### listen

Usage:

```
receive.listen(server, callback);
```

Parameters:

* **server**: http server (*object*, required)

Listens for when the callback url sends data to the server.  
Responds with an *object* in the data parameter of the callback.

Response Object:

* **value**: the value of the payment received, in satoshi (*number*)
* **input_address**: the bitcoin address that received the transaction (*string*)
* **confirmations**: the number of confirmations of this transaction (*number*)
* **transaction_hash**: the hash of the transaction (*string*)
* **input_transaction_hash**: the original hash, before forwarding (*string*)
* **destination_address**: the destination bitcoin address (*string*)
* **{Custom Parameter}**: any parameters included in the callback url that have been passed back