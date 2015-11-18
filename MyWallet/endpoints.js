'use strict';

var UrlPattern = require('url-pattern');

module.exports = {
  create      : new UrlPattern('/api/v2/create_wallet?password=:password&api_code=:apiCode(&priv=:priv)(&label=:label)(&email=:email)'),
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
