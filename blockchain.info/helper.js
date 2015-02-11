
var request = require('request');

// Helper functions

// Makes adding to the request url neater/easier [stable]
function appendToURL(param, val) {
	var str;
	(val === undefined) ? str = '' : str = ('&' + param + '=' + val).toString();
	return str;
}

// Handles requests and errors [probably stable]
function makeRequest(url, callback) {
	request(url, function(error, response, body) {
		if (!error) {
			var data = JSON.parse(body);
			if (!data['error']) {
				callback(null, data);
			} else {
				callback('err: ' + data['error']);
			}
		} else {
			callback(error);
		}
	});
}

exports.appendToURL = appendToURL;
exports.makeRequest = makeRequest;
