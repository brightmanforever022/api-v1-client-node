
var api = require('./api');

module.exports = {
	get 					: get,
	getChartData	: getChartData
};

function get(options) {
	return api
		.request('stats', { apiKey: options.apiCode })
		.then(function (data) {
			data = options.stat ? data[options.stat] : data;
			if (!data) throw 'stat nonexistent';
			return data;
		});
};

function getChartData(chartType) {
	return api
		.request('charts', { type: chartType })
		.then(function (data) { return data.values; });
};
