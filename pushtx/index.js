'use strict';

var API					= require('../api')
	, UrlPattern	= require('url-pattern');

var endpoints = {
  pushtx	: new UrlPattern('/pushtx')
};

var api = API(endpoints);

module.exports = {
	pushtx: pushtx
};

function pushtx(txHex, options) {
	var body = { tx: txHex, api_code: options.apiCode };
	return api.post('pushtx', {}, body);
}
