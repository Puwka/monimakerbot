// 3rd party
// const axios = require('axios')
// node.js pack
const crypto = require("crypto");
//project modules
const localData = require('./local/data')
// const moment = require("moment");
const request = require('request');


const key = localData.getKey()
const secret = localData.getSecret()
let nonce = localData.getNonce()

const payload = {nonce: nonce, method: 'getInfo'}

function hmacPayload (secret, params) {
  var data = []
  for (let param in params) {
      data.push(`${param}=${params[param]}`)
  }
  var data = data.join('&')

  hash = crypto.createHmac('sha512', secret)
  hash.update(data)
  return(hash.digest('hex'))
}

var sign = hmacPayload(secret, payload)

var url = 'https://yobit.io/tapi/';
var headers = { 
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Key': key,
    'Sign' : sign
};

request.post({ url: url, form: payload, headers: headers }, function (e, r, body) {
  nonce = nonce + 1
  localData.setNonce(nonce)
  console.log(body)
});

// 
// axios.defaults.headers.common['Key'] = key
// axios.defaults.headers.common['Sign'] = sign
// axios.post('https://yobit.io/tapi/', payload)
// .then(res => console.log(res))
// .catch(e => console.log(e))
