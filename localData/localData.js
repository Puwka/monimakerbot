const fs = require('fs')

let getKey = () => {
  let storage = fs.readFileSync('./keys.json')
  let result = JSON.parse(storage)
  return result.key
}

let getSecret = () => {
  let storage = fs.readFileSync('./keys.json')
  let result = JSON.parse(storage)
  return result.secret
}

module.exports = {
  getKey,
  getSecret
}
