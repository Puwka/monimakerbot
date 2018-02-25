const axios = require('axios')
const crypto = require("crypto");
const moment = require("moment");

const key = '09B064DBD34EEEB07DABBF230E4A5B22'
const secret = '590e5f84dd2a8cdaf3036b14254b8b28'
const payload = {'nonce': 125}

function hmacPayload (secret, payload) {
  const string = Object.keys(payload)
    .sort()
    .map(k => `${k}=${payload[k]}`)
    .join('\n')
  return crypto.createHmac('sha512', secret)
          .update(string)
          .digest('hex')
}

var hmac = hmacPayload(secret, payload)
console.log(hmac)

// axios({
//   method: 'getInfo',
//   url: 'https://yobit.net/tapi/',
//   headers: {
//     'Key': key,
//     'Sign': hmac,
//     "Content-type": "application/x-www-form-urlencoded",
//   }
// }).then(res => console.log(res))
// .catch(e => console.log(e))
