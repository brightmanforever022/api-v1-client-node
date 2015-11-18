'use strict';

var api = require('../api');

module.exports = {
	create: create
};

function create(password, apiCode, options) {
	options = options || {};
	var params = {
		password: password,
		apiCode: 	apiCode,
		priv: 		options.priv,
		label:		options.label,
		email:		options.email
	};
	return api.request('create', params);
}
