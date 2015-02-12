
var MyWallet = require('./MyWallet');
var helper = require('./helper');
var appendToURL = helper.appendToURL;
var makeRequest = helper.makeRequest;

function CreateWallet(pass, code, options) {

	options = options || {};
	this.pass = pass;
	this.url = 'https://blockchain.info/api/v2/create_wallet?password=' + this.pass + '&api_code=' + code;

	this.url += appendToURL('priv', options.privateKey);
	this.url += appendToURL('label', options.label);
	this.url += appendToURL('email', options.email);

	return this;
}

// Creates a new wallet and returns a Wallet Object [stable, documented]
CreateWallet.prototype.create = function(callback) {
	makeRequest(this.url, callback);
}

// Creates a new wallet and returns an instance of MyWallet [stable, documented]
CreateWallet.prototype.open = function(callback) {
	makeRequest(this.url, function(error, data) {
		if (!error) {
			var newWallet = new MyWallet(data['guid'], this.pass);
			callback(null, newWallet);
		} else {
			callback(error);
		}
	});
}

module.exports = CreateWallet;