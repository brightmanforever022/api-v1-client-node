'use strict';

var api = require('./api');

module.exports = {
	pushtx: pushtx
};

function pushtx(txHex) {
	var payload = encodeURIComponent(JSON.stringify({ tx: txHex }));
	return api.request('pushtx', { payload: payload });
}
