'use strict';

var api = require('../api');

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

function getBlock(blockHash) {
	return api.request('rawblock', { hash: blockHash });
}

function getTx(txHash) {
	return api.request('rawtx', { hash: txHash });
}

function getBlockHeight(blockHeight) {
	return api.request('blockHeight', { height: blockHeight });
}

function getAddress(address, options) {
	options = options || {};
	var params = { address: address, limit: options.limit, offset: options.offset };
	return api.request('address', params);
}

function getMultiAddress(addresses) {
	addresses = (addresses instanceof Array ? addresses : [addresses]).join('|');
	return api.request('multiaddr', { active: addresses });
}

function getUnspentOutputs(addresses) {
	addresses = (addresses instanceof Array ? addresses : [addresses]).join('|');
	return api.request('unspent', { active: addresses });
}

function getLatestBlock() {
	return api.request('latestblock');
}

function getUnconfirmedTx() {
	return api.request('unconfTxs');
}

function getBlocks(time) {
	return api.request('blocks', { time: time });
}

function getInventoryData(hash) {
	return api.request('inv', { hash: hash });
}
