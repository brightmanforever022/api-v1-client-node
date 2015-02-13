
var helper = require('./helper');
var root = helper.root;
var makeRequest = helper.makeRequest;
var appendToURL = helper.appendToURL;

var pushtx = {};

pushtx.pushtx = function(tx, apiCode, callback) {

	if (arguments.length === 2) {
		callback = apiCode;
		apiCode = undefined;
	}

}

module.exports = pushtx;