'use strict';

var UrlPattern = require('url-pattern');

module.exports = {
  rawblock    : new UrlPattern('/rawblock/:hash(?api_code=:api_code)'),
  rawtx       : new UrlPattern('/rawtx/:hash(?api_code:=api_code)'),
  blockHeight : new UrlPattern('/block-height/:height?format=json(&api_code:=api_code)'),
  address     : new UrlPattern('/address/:address?format=json(&limit=:limit)(&offset=:offset)(&api_code:=api_code)'),
  multiaddr   : new UrlPattern('/multiaddr?active=:active(&api_code:=api_code)'),
  unspent     : new UrlPattern('/unspent?active=:active(&api_code:=api_code)'),
  latestblock : new UrlPattern('/latestblock(?api_code:=api_code)'),
  unconfTxs   : new UrlPattern('/unconfirmed-transactions?format=json(&api_code:=api_code)'),
  blocks      : new UrlPattern('/blocks/:time?format=json(&api_code:=api_code)'),
  inv         : new UrlPattern('/inv/:hash?format=json(&api_code:=api_code)')
};
