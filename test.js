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

let test = () => {
    return new Promise((resolve, reject) => {
        let vp = bmv.valueB2()
            .then(res => {
                return new Promise((resolve, reject) => {
                    request.get(`https://yobit.net/api/3/ticker/${res}_btc`, (e, r, body) => {
                        if (e) reject(e)
                        resolve({body, crypto: res})
                    })
                }).then(res => {
                    return new Promise((resolve, rejcet) => {
                        const payload = {nonce, method: 'getInfo'}
                        const headers = getPayload(payload)
                        console.log(headers)
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

test()