'use strict';

var API					= require('../api')
	, UrlPattern	= require('url-pattern');

var endpoints = {
  pushtx	: new UrlPattern('/pushtx/:payload')
};

var api = API(endpoints);

module.exports = {
	pushtx: pushtx
};

function pushtx(txHex) {
	var payload = encodeURIComponent(JSON.stringify({ tx: txHex }));
	return api.request('pushtx', { payload: payload });
}
