
var url = require('url');
var include = require('./include');
var makeRequest = include.makeRequest;
var appendToURL = include.appendToURL;

function Receive(address, callbackURL, options) {
	options = options || {};
	this.address = address;
	this.callbackURL = callbackURL;
	this.apiCode = options.apiCode || undefined;
	this.confirmations = options.confirmations || 6;
}

Receive.prototype.create = function(parameters, callback) {

	if (arguments.length === 1) {
		callback = parameters;
		parameters = {};
	}

	var cbURL = this.callbackURL + '?format=json';
	for (key in parameters) {
		cbURL += appendToURL(key, parameters[key]);
	}

	var callUrl = include.root + 'api/receive?method=create';
	callUrl += appendToURL('address', encodeURIComponent(this.address));
	callUrl += appendToURL('callback', encodeURIComponent(cbURL));
	callUrl += appendToURL('api_code', this.apiCode);

	makeRequest(callUrl, callback);

	return this;
}

// [not working]
// Receive.prototype.checkLogs = function(callback) {
// 	var callUrl = include.root + 'api/receive?method=check_logs&format=json';
// 	callUrl += appendToURL('callback', encodeURIComponent(this.callbackURL));
// 	makeRequest(callUrl, callback);
// }

Receive.prototype.listen = function(server, callback) {

	var thisReceive = this;

	server.on('request', function(req, res) {

		if (!thisReceive.address || !thisReceive.callbackURL) {
			callback('err: Missing address or callbackURL');
		} else {
			var parsed = url.parse(req.url, true);
			var callbackUrlData = {
				host: req.host,
				path: parsed.pathname,
				query: parsed.query
			}

			if (callbackUrlData.host === url.parse(thisReceive.callbackURL).host){
				if (callbackUrlData.query['destination_address'] === thisReceive.address) {
					if (+callbackUrlData.query['confirmations'] >= thisReceive.confirmations) {
						callback(null, callbackUrlData.query);
					}
				}
			}

		}

	});

	return this;
}

module.exports = Receive;