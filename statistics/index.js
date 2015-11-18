'use strict';

var API	        = require('../api')
  , UrlPattern  = require('url-pattern');

var	endpoints	= {
  charts	: new UrlPattern('/charts/:type?format=json(&api_code=:apiCode)'),
  stats   : new UrlPattern('/stats?format=json(&api_code=:apiCode)')
};

var api = new API(endpoints);

module.exports = {
	get 					: get,
	getChartData	: getChartData
};

function get(options) {
	options = options || {};
	return api
		.request('stats', { apiCode: options.apiCode })
		.then(function (data) {
			data = options.stat ? data[options.stat] : data;
			if (!data) throw 'stat nonexistent';
			return data;
		});
}

function getChartData(chartType, options) {
	options = options || {};
	return api
		.request('charts', { type: chartType, apiCode: options.apiCode })
		.then(function (data) { return data.values; });
}
