'use strict';

var api = require('./api');

exports.pushtx = function(txHex) {
	var payload = encodeURIComponent(JSON.stringify({ tx: txHex }));
	return api.request('pushtx', { payload: payload });
};
