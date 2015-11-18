'use strict';

var UrlPattern = require('url-pattern');

module.exports = {
  rawblock    : new UrlPattern('/rawblock/:hash'),
  rawtx       : new UrlPattern('/rawtx/:hash'),
  blockHeight : new UrlPattern('/block-height/:height?format=json'),
  address     : new UrlPattern('/address/:address?format=json(&limit=:limit)(&offset=:offset)'),
  multiaddr   : new UrlPattern('/multiaddr?active=:active'),
  unspent     : new UrlPattern('/unspent?active=:active'),
  latestblock : new UrlPattern('/latestblock'),
  unconfTxs   : new UrlPattern('/unconfirmed-transactions?format=json'),
  blocks      : new UrlPattern('/blocks/:time?format=json'),
  inv         : new UrlPattern('/inv/:hash?format=json')
};
