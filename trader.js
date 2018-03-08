// 3rd party
const request = require('request');
// node.js pack
const crypto = require("crypto");
//project modules
const localData = require('./local/data')
const bmv = require('./bringMeValue')



const key = localData.getKey()
const secret = localData.getSecret()
let nonce = localData.getNonce()
const url = 'https://yobit.io/tapi/';


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

let getPayload = (payload) => {
  let sign = hmacPayload(secret, payload)
  let headers = {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Key': key,
      'Sign' : sign
  };
  return headers
}

let info = () => {
  return new Promise((resolve, reject) => {
    let vp = bmv.valueB2()
    .then(res => {
      return new Promise((resolve, reject) => {
        request.get(`https://yobit.net/api/3/ticker/${res}_btc`, (e, r, body) => {
          if (e) reject(e)
          resolve({body, crypto: res})
        })
      }).then(res => {
        return new Promise((resolve, reject) => {
          const parsedRes = JSON.parse(res.body)
          const balance = 0.00025
          let low = parsedRes[`${res.crypto}_btc`].low
          low < 0.000001 ? low = 0.000001 : low = low
          let rate = low * 1.4
          let amount = Math.floor(balance/rate)
          const payload = {nonce, method: 'Trade', pair: `${res.crypto}_btc`, type: 'buy', amount, rate}
          const headers = getPayload(payload)
          request.post({url, headers, form: payload}, (e, r, body) => {
            nonce++
            localData.setNonce(nonce)
            if (e) reject(e)
            resolve(body)
          })
        }).then(res => console.log(res))
      })
    })
  }).catch(e => console.log(e))
}

info()

// return new Promise((resolve, reject) => {
//   const payload = {nonce, method: 'getInfo'}
//   let headers = getPayload(payload)
//   request.post({ url, form: payload, headers }, (e, r, body) => {
//       nonce = nonce + 1
//       if(e) {
//         reject(`First request covered with shit: ${e}`)
//       }
//       resolve(body)
//     })
// }).then(res => {
//   console.log(res)
//   const payload = {nonce, method: 'ActiveOrders', pair: 'ltc_btc'}
//   let headers = getPayload(payload)
//   return new Promise((resolve, reject) => {
//     request.post({url, form: payload, headers}, (e, r, body) => {
//     nonce = nonce + 1
//     localData.setNonce(nonce)
//     if(e) reject(`Second request covered with shit: ${e}`)
//     resolve(body)
//     })
//   }).then(res => console.log(res))

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
