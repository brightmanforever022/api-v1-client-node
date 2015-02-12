
var request = require('request');
var helper = require('./helper');
var root = helper.root;
var appendToURL = helper.appendToURL;
var makeRequest = helper.makeRequest;
var satoshi_per_btc = 100000000;
var btc_per_satoshi = 0.00000001;

function MyWallet(guid, pass, pass2) {

	this.guid = guid;
	this.pass = pass;
	this.pass2 = pass2;

	// Lists out addresses of wallet, or single aspects of an address [stable]
	// this.getAddresses = function(a, b) {
	// 	var url = 'https://blockchain.info/merchant/' + this.guid + '/list?password=' + this.pass,
	// 	args = arguments.length;
	// 	if (args === 1) { // a is callback, b is null [stable]
	// 		makeRequest(url, a);
	// 	} else if (args === 2) { // a is param, b is callback [stable]
	// 		makeRequest(url, function(error, data) {
	// 			if (!error) {
	// 				var attributes = [];
	// 				data.addresses.forEach(function(value) {
	// 					attributes.push(value[a]);
	// 				});
	// 				b(null, attributes);
	// 			} else {
	// 				b(error);
	// 			}
	// 		});
	// 	}
	// 	return thisWallet;
	// }

	// Gets the balance of one specific address [stable]
	// this.getAddressBalance = function(address, confirmations, callback) {
	// 	var url = 'https://blockchain.info/merchant/' + this.guid + '/address_balance?password=' + this.pass;
	// 	url += appendToURL('address', address);
	// 	url += appendToURL('confirmations', confirmations);
	// 	makeRequest(url, callback);
	// 	return thisWallet;
	// }

	// Gets the balance of the whole wallet, an address, or an array of addresses [stable]
	// this.getBalance = function(a, b) {
	// 	var args = arguments.length,
	// 	defaultConfirmations = 3;

	// 	if(args === 1) { // a is the callback, b is null [stable]

	// 		var url = 'https://blockchain.info/merchant/' + this.guid + '/balance?password=' + this.pass;
	// 		makeRequest(url, a);

	// 	} else if (args === 2 && typeof a === 'string') { // a is address, b is callback [stable]

	// 		thisWallet.getAddressBalance(a, defaultConfirmations, b);

	// 	} else if (args === 2 && typeof a === 'object') { // a is options, b is callback [stable]

	// 		var confirmations = a.confirmations || defaultConfirmations;

	// 		if (typeof a.addresses === 'object') {
	// 			a.addresses.forEach(function(value, index, array) {
	// 				thisWallet.getAddressBalance(value, confirmations, b);
	// 			});
	// 		} else if (a.addresses === undefined) {
	// 			thisWallet.getAddressBalance(a.address, confirmations, b);
	// 		}

	// 	}
	// 	return thisWallet;
	// }

	return this;

}

// Sends BTC from your wallet [stable, documented]
MyWallet.prototype.send = function(options, callback) {
	var url = root + 'merchant/' + this.guid + '/payment?password=' + this.pass;

	if (String(options.inBTC) === 'true' && options.amount !== undefined) options.amount *= satoshi_per_btc;
	if (String(options.inBTC) === 'true' && options.fee !== undefined) options.fee *= satoshi_per_btc;

	url += appendToURL('second_password', this.pass2);
	url += appendToURL('address', options.to);
	url += appendToURL('amount', options.amount);

	// Optional parameters
	url += appendToURL('from', options.from);
	url += appendToURL('fee', options.fee);
	url += appendToURL('note', options.note);

	request(url, function(error, response, body) {
		callback(error, JSON.parse(body));
	});

	return this;
}

// Sends bitcoin to multiple addresses [stable, documented]
MyWallet.prototype.sendMany = function(options, recipients, callback) {
	var args = arguments.length
	url = root + 'merchant/' + this.guid + '/sendmany?password=' + this.pass;

	if (args === 2) {
		callback = addresses;
		addresses = options;
		options = {};
	}

	if (String(options.inBTC) === 'true' && recipients !== undefined) {
		for (var key in recipients) {
			recipients[key] *= satoshi_per_btc;
		}
	}

	var recipientsURI = encodeURIComponent(JSON.stringify(recipients));

	url += appendToURL('second_password', this.pass2);
	url += appendToURL('recipients', recipientsURI);

	// Optional parameters
	url += appendToURL('from', options.from);
	url += appendToURL('fee', options.fee);
	url += appendToURL('note', options.note);

	makeRequest(url, callback);

	return this;
}

// Gets the balance of the whole wallet [stable, documented]
MyWallet.prototype.getBalance = function(inBTC, callback) {
	var url = root + 'merchant/' + this.guid + '/balance?password=' + this.pass,
	conversion = 1;

	if (arguments.length === 1) {
		callback = inBTC;
		inBTC = false;
	}

	if (String(inBTC) === 'true') conversion = btc_per_satoshi;

	makeRequest(url, function(error, data) {
		if (!error) callback(null, (data.balance * conversion));
		else callback(error);
	});
	return this;
}

// Generates a list of address objects [stable, documented]
MyWallet.prototype.listAddresses = function(callback) {
	var url = root + 'merchant/' + this.guid + '/list?password=' + this.pass;
	makeRequest(url, callback);
	return this;
}

// Gets the balance of one specific address [stable, documented]
MyWallet.prototype.getAddress = function(address, confirmations, callback) {
	var url = root + 'merchant/' + this.guid + '/address_balance?password=' + this.pass;

	if (arguments.length === 2) {
		callback = confirmations;
		confirmations = 6;
	}

	url += appendToURL('address', address);
	url += appendToURL('confirmations', confirmations);
	makeRequest(url, callback);
	return this;
}

// Creates a new address, returns the address object [stable, documented]
MyWallet.prototype.newAddress = function(label, callback) {

	var url = root + 'merchant/' + this.guid + '/new_address?password=' + this.pass;

	if (arguments.length === 1) {
		callback = label;
		label = undefined;
	}

	url += appendToURL('second_password', this.pass2);
	url += appendToURL('label', label);

	makeRequest(url, callback);

	return this;
}

// Archive an address [stable, documented]
MyWallet.prototype.archiveAddress = function(address, callback) {

	var url = root + 'merchant/' + this.guid + '/archive_address?password=' + this.pass;

	url += appendToURL('second_password', this.pass2);
	url += appendToURL('address', address);

	makeRequest(url, callback);

	return this;
}

// Unarchive an address [stable, documented]
MyWallet.prototype.unarchiveAddress = function(address, callback) {

	var url = root + 'merchant/' + this.guid + '/unarchive_address?password=' + this.pass;

	url += appendToURL('second_password', this.pass2);
	url += appendToURL('address', address);

	makeRequest(url, callback);

	return this;
}

// Consolidates addresses that have not been used in the past X days [probably stable, documented]
MyWallet.prototype.consolidate = function(days, callback) {

	var url = root + 'merchant/' + this.guid + '/auto_consolidate?password=' + this.pass;

	if (arguments.length === 1) {
		callback = days;
		days = 60;
	}

	url += appendToURL('second_password', this.pass2);
	url += appendToURL('days', days);

	makeRequest(url, callback);

	return this;
}



module.exports = MyWallet;




