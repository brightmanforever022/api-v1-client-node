
var helper = require('./helper');
var appendToURL = helper.appendToURL;
var makeRequest = helper.makeRequest;

var exchangeRates = {};

// Gets the price of Bitcoin from the Blockchain ticker [stable, documented]
exchangeRates.getTicker = function(a, b) {
	var args = arguments.length;
	if (args === 1) { // a is callback, b is null
		makeRequest('https://blockchain.info/ticker', a);
	} else if (args === 2) { // a is options, b is callback
		makeRequest('https://blockchain.info/ticker', function(error, data) {
			if (!error) {
				if (a.currency !== undefined) {
					if (typeof a.currency === 'string') {
						data = data[a.currency];
						if (a.property !== undefined) {
							data = JSON.stringify(data[a.property]);
						}
						b(error, data);
					} else if (typeof a.currency === 'object') {
						a.currency.forEach(function(value, index, array) {
							var currencyData = data[value];
							if (a.property !== undefined) {
								currencyData = JSON.stringify(currencyData[a.property]);
							}
							b(error, currencyData);
						});
					}
				} else {
					b("Error: Must specify a currency (ex: 'USD')");
				}
			} else {
				b(error);
			}
		});
	}

	return exchangeRates;
}

// Converts an amount of money to BTC, defaults to USD [stable, documented]
exchangeRates.toBTC = function(amount, currency, callback) {

	if (arguments.length === 2) {
		callback = currency;
		currency = 'USD';
	}

	var url = 'https://blockchain.info/tobtc?currency=' + currency + '&value=' + amount;

	makeRequest(url, function(error, data) {
		callback(error, +data);
	});

	return exchangeRates;
}

module.exports = exchangeRates;
