'use strict';

var API 			= require('../api')
 	, endpoints	= require('./endpoints')
	, api 			= new API(endpoints);

function MyWallet(guid, password, options) {
  options   = options || {};
  this.guid = guid;
	this.getParams = function () {
		return {
			guid						: guid,
			password				: password,
			secondPassword	: options.secondPassword,
			apiCode				  : options.apiCode
		};
	};
	return this;
}

MyWallet.prototype.send = function (address, amount, options) {
	options = options || {};
	var params = this.getParams();
	params.address 	= address;
	params.amount		= amount;
	params.from			= options.from;
	params.fee			= options.fee;
	params.note 		= options.note;
	return api.request('payment', params);
};

MyWallet.prototype.sendMany = function (recipients, options) {
	options = options || {};
	var params = this.getParams();
	params.recipients	= encodeURIComponent(JSON.stringify(recipients));
	params.from				= options.from;
	params.fee				= options.fee;
	params.note 			= options.note;
	return api.request('sendmany', params);
};

MyWallet.prototype.getBalance = function () {
	var params = this.getParams();
	return api.request('balance', params);
};

MyWallet.prototype.listAddresses = function () {
	var params = this.getParams();
	return api.request('list', params);
};

MyWallet.prototype.getAddress = function (address, options) {
	options = options || {};
	var params = this.getParams();
	params.address 				= address;
	params.confirmations	= options.confirmations || 6;
	return api.request('addrBalance', params);
};

MyWallet.prototype.newAddress = function (options) {
	options = options || {};
	var params = this.getParams();
	params.label = options.label;
	return api.request('newAddress', params);
};

MyWallet.prototype.archiveAddress = function (address) {
	var params = this.getParams();
	params.address = address;
	return api.request('archive', params);
};

MyWallet.prototype.unarchiveAddress = function (address) {
	var params = this.getParams();
	params.address = address;
	return api.request('unarchive', params);
};

MyWallet.prototype.consolidate = function (options) {
	options = options || {};
	var params = this.getParams();
	params.days = options.days || 60;
	return api.request('consolidate', params);
};

MyWallet.create = function (password, apiCode, options) {
	options = options || {};
	var params = {
		password: password,
		apiCode: 	apiCode,
		priv: 		options.priv,
		label:		options.label,
		email:		options.email
	};
	return api.request('create', params).then(function (response) {
		var walletOptions = { apiCode: apiCode };
		return new MyWallet(response.guid, password, walletOptions);
	});
};

module.exports = MyWallet;
