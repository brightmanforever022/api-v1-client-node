'use strict';

var API 			= require('../api')
 	, endpoints	= require('./endpoints')
	, api 			= new API(endpoints);

module.exports = {
	getBlock					: getBlock,
	getTx							: getTx,
	getBlockHeight		: getBlockHeight,
	getAddress				: getAddress,
	getMultiAddress		: getMultiAddress,
	getUnspentOutputs	: getUnspentOutputs,
	getLatestBlock		: getLatestBlock,
	getUnconfirmedTx	: getUnconfirmedTx,
	getBlocks					: getBlocks,
	getInventoryData	: getInventoryData
};

function getBlock(blockHash, options) {
  options = options || {};
	return api.request('rawblock', { hash: blockHash, api_code: options.api_code });
}

function getTx(txHash, options) {
  options = options || {};
	return api.request('rawtx', { hash: txHash, api_code: options.api_code });
}

function getBlockHeight(blockHeight, options) {
  options = options || {};
	return api.request('blockHeight', { height: blockHeight, api_code: options.api_code });
}

function getAddress(address, options) {
	options = options || {};
	var params = { address: address, limit: options.limit, offset: options.offset, api_code: options.api_code };
	return api.request('address', params);
}

function getMultiAddress(addresses, options) {
  options = options || {};
	addresses = (addresses instanceof Array ? addresses : [addresses]).join('|');
	return api.request('multiaddr', { active: addresses, api_code: options.api_code });
}

function getUnspentOutputs(addresses, options) {
  options = options || {};
	addresses = (addresses instanceof Array ? addresses : [addresses]).join('|');
	return api.request('unspent', { active: addresses, api_code: options.api_code });
}

function getLatestBlock(options) {
  options = options || {};
	return api.request('latestblock', options);
}

function getUnconfirmedTx(options) {
  options = options || {};
	return api.request('unconfTxs', options);
}

function getBlocks(time, options) {
  options = options || {};
	return api.request('blocks', { time: time, api_code: options.api_code });
}

function getInventoryData(hash, options) {
  options = options || {};
	return api.request('inv', { hash: hash, api_code: options.api_code });
}
