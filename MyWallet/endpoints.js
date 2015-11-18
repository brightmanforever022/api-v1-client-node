'use strict';

var UrlPattern = require('url-pattern');

module.exports = {
  create      : new UrlPattern('/api/v2/create_wallet?password=:password&api_code=:apiCode(&priv=:priv)(&label=:label)(&email=:email)'),
  payment     : new UrlPattern('/merchant/:guid/payment?password=:password&address=:address&amount=:amount(&second_password=:secondPassword)(&from=:from)(&fee=:fee)(&note=:note)(&api_code=:apiCode)'),
  sendmany    : new UrlPattern('/merchant/:guid/sendmany?password=:password&recipients=:recipients(&second_password=:secondPassword)(&from=:from)(&fee=:fee)(&note=:note)(&api_code=:apiCode)'),
  balance     : new UrlPattern('/merchant/:guid/balance?password=:password(&api_code=:apiCode)'),
  list        : new UrlPattern('/merchant/:guid/list?password=:password(&api_code=:apiCode)'),
  addrBalance : new UrlPattern('/merchant/:guid/address_balance?password=:password&address=:address(&confirmations=:confirmations)(&api_code=:apiCode)'),
  newAddress  : new UrlPattern('/merchant/:guid/new_address?password=:password(&second_password=:secondPassword)(&label=:label)(&api_code=:apiCode)'),
  archive     : new UrlPattern('/merchant/:guid/archive_address?password=:password&address=:address(&second_password=:secondPassword)(&api_code=:apiCode)'),
  unarchive   : new UrlPattern('/merchant/:guid/unarchive_address?password=:password&address=:address(&second_password=:secondPassword)(&api_code=:apiCode)'),
  consolidate : new UrlPattern('/merchant/:guid/auto_consolidate?password=:password(&second_password=:secondPassword)(&days=:days)(&api_code=:apiCode)')
};
