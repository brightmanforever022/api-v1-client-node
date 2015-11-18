
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
  create      : new UrlPattern('/api/v2/create_wallet?password=:password&api_code=:apiCode(&priv=:priv)(&label=:label)(&email=:email)'),
  ticker      : new UrlPattern('/ticker'),
  tobtc       : new UrlPattern('/tobtc?value=:value&currency=:currency'),
  pushtx      : new UrlPattern('/pushtx/:payload'),
  payment     : new UrlPattern('/merchant/:guid/payment?password=:password&address=:address&amount=:amount(&second_password=:second_password)(&from=:from)(&fee=:fee)(&note=:note)'),
  sendmany    : new UrlPattern('/merchant/:guid/sendmany?password=:password&recipients=:recipients(&second_password=:second_password)(&from=:from)(&fee=:fee)(&note=:note)'),
  balance     : new UrlPattern('/merchant/:guid/balance?password=:password'),
  list        : new UrlPattern('/merchant/:guid/list?password=:password'),
  addrBalance : new UrlPattern('/merchant/:guid/address_balance?password=:password&address=:address(&confirmations=:confirmations)'),
  newAddress  : new UrlPattern('/merchant/:guid/new_address?password=:password(&second_password=:second_password)(&label=:label)'),
  archive     : new UrlPattern('/merchant/:guid/archive_address?password=:password&address=:address(&second_password=:second_password)'),
  unarchive   : new UrlPattern('/merchant/:guid/unarchive_address?password=:password&address=:address(&second_password=:second_password)'),
  consolidate : new UrlPattern('/merchant/:guid/auto_consolidate?password=:password(&second_password=:second_password)(&days=:days)')
};

function apiRequest(api, options) {
  try {
  	var endpoint	= patterns[api].stringify(options)
  		, root			= options.v2 ? rootV2 : rootV1
  		, apiurl		= url.resolve(root, endpoint);
  	return request(apiurl).then(parseResponse);
  } catch (err) {
    return q.reject(err);
  }
}

function parseResponse(response) {
  try       { return JSON.parse(response);  }
  catch (e) { return response;              }
}

module.exports = {
  request: apiRequest
};
