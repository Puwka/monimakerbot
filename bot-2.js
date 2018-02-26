// 3rd party
const request = require('request');
// node.js pack
const crypto = require("crypto");
//project modules
const localData = require('./local/data')
// const moment = require("moment");



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

let info = () => {
  return new Promise((resolve, reject) => {
    request.post({ url: url, form: payload, headers: headers }, (e, r, body) => {
        nonce = nonce + 1
        localData.setNonce(nonce)
        if(e) {
          reject('wrong link')
        }
        resolve(body)
      })
  }).then(res => {
    return new Promise((resolve, reject) => {
      if(res) {
        resolve('gotcha')
      }
      reject('huy')
    }).then(res => console.log(res))
  }).catch(e => console.log(e))
}

info()

// axios.post('https://yobit.io/tapi/', payload, {
//   headers: {
//     'Key': key,
//     'Sign': sign
//   }
// })
// .then(response => {
//   console.log(response.data);
//     console.log(response.status);
//     console.log(response.headers);
//     console.log(response.config);
//   nonce += 1
//   localData.setNonce(nonce)
// })
// .catch(e => console.log(e))
