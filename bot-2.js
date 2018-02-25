const axios = require('axios')



axios({
  method: 'post',
  url: 'https://yobit.net/tapi/?getInfo&nonce=100',
  headers: {
    'Key': '09B064DBD34EEEB07DABBF230E4A5B22',
    'Sign': '590e5f84dd2a8cdaf3036b14254b8b28',
    "Content-type": "application/x-www-form-urlencoded",
  }
}).then(res => console.log(res))
.catch(e => console.log(e))
