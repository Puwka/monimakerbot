// 3rd party
const axios = require('axios')
// node.js pack
const crypto = require("crypto");
//project modules
const localData = require('./localData/localData')
// const moment = require("moment");

const key = localData.getKey()
const secret = localData.getSecret()
const payload = {'nonce': 129}

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

axios({
  method: 'post',
  url: `https://yobit.net/tapi/`,
  headers: {
    'Key': key,
    'Sign': hmac,
    "Content-type": "application/x-www-form-urlencoded",
  },
  data: {
    nonce: 129,
    method: 'getInfo'
  }
}).then(res => console.log(res))
.catch(e => console.log(e))
