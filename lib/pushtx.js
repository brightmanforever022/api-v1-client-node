
var helper = require('./helper');
var root = helper.root;
var makeRequest = helper.makeRequest;
var appendToURL = helper.appendToURL;

var pushtx = {};

pushtx.pushtx = function(tx, apiCode, callback) {

	var payload = {
		'tx': tx
	}

	if (arguments.length === 2) {
		callback = apiCode;
		apiCode = undefined;
	} else {
		payload['api_code'] = apiCode;
	}

	var url = root + 'pushtx/' + encodeURIComponent(JSON.stringify(payload));

	makeRequest(url, callback);
}

module.exports = pushtx;