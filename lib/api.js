
var request 		= require('request-promise')
  , q           = require('q')
	,	UrlPattern 	= require('url-pattern')
	, url 				= require('url');

var rootV1 = url.format({
	protocol:	'https',
	host:			'blockchain.info'
});

var rootV2 = url.format({
	protocol:	'https',
	host: 		'api.blockchain.info',
  path:     'v2'
});

var patterns = {
	charts:  new UrlPattern('/charts/:type?format=json(&api_code=:apiKey)'),
	stats:   new UrlPattern('/stats?format=json(&api_code=:apiKey)'),
};

function apiRequest(api, options) {
  try {
  	var endpoint	= patterns[api].stringify(options)
  		, root			= options.v2 ? rootV2 : rootV1
  		, apiurl		= url.resolve(root, endpoint);
  	return request(apiurl).then(JSON.parse);
  } catch (err) {
    return q.reject(err);
  }
}

module.exports = {
  request: apiRequest
};
