
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
  charts      : new UrlPattern('/charts/:type?format=json(&api_code=:apiCode)'),
  stats       : new UrlPattern('/stats?format=json(&api_code=:apiCode)'),
  rawblock    : new UrlPattern('/rawblock/:hash'),
  rawtx       : new UrlPattern('/rawtx/:hash'),
  blockHeight : new UrlPattern('/block-height/:height?format=json'),
  address     : new UrlPattern('/address/:address?format=json(&limit=:limit)(&offset=:offset)'),
  multiaddr   : new UrlPattern('/multiaddr?active=:active'),
  unspent     : new UrlPattern('/unspent?active=:active'),
  latestblock : new UrlPattern('/latestblock'),
  unconfTxs   : new UrlPattern('/unconfirmed-transactions?format=json'),
  blocks      : new UrlPattern('/blocks/:time?format=json'),
  inv         : new UrlPattern('/inv/:hash?format=json'),
  create      : new UrlPattern('/api/v2/create_wallet?password=:password&api_code=:apiCode(&priv=:priv)(&label=:label)(&email=:email)')
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
