const axios = require('axios')
const fs = require('fs')

const bringMeValue = require('./bringMeValue')

let crypto = bringMeValue.value((crypto) => {
  let vp = `${crypto}_btc`
  console.log(`Your pair is: ${vp}`)

  setInterval(() => {
    axios.get(`https://yobit.net/api/3/depth/${vp}?limit=6`)
    .then(response => {
      if (!fs.existsSync(`./${vp}_depth.txt`)) {
        fs.writeFile(`${vp}_depth.txt`, `${JSON.stringify(response.data)}` + `\n\n`, e => {
          if(e) throw e
        })
      } else {
        fs.appendFile(`${vp}_depth.txt`, `${JSON.stringify(response.data)}` + '\n\n', e => {
          if(e) throw e
        })
      }
    })
    .catch(e => console.log(e))
  }, 600)

  // setInterval(() => {
  //   axios.get(`https://yobit.io/api/3/trades/${vp}`)
  //   .then(response => {
  //     if (!fs.existsSync(`./${vp}_trades.txt`)) {
  //       fs.writeFile(`${vp}_trades.txt`, `Price: ${JSON.stringify(response.data[vp][0].price)} Timestamp: ${JSON.stringify(response.data[vp][0].timestamp)} Amount: ${JSON.stringify(response.data[vp][0].amount)}` + `\n\n`, e => {
  //         if(e) throw e
  //       })
  //     } else {
  //       fs.appendFile(`${vp}_trades.txt`, `Price: ${JSON.stringify(response.data[vp][0].price)} Timestamp: ${JSON.stringify(response.data[vp][0].timestamp)} Amount: ${JSON.stringify(response.data[vp][0].amount)}` + '\n\n', e => {
  //         if(e) throw e
  //       })
  //     }
  //   })
  //   .catch(e => console.log(e))
  // }, 1200)
  //
  // setInterval(() => {
  //   axios.get(`https://yobit.io/api/3/ticker/${vp}`)
  //   .then(response => {
  //     if (!fs.existsSync(`./${vp}_ticker.txt`)) {
  //       fs.writeFile(`${vp}_ticker.txt`, `Buy: ${JSON.stringify(response.data[vp].buy)} Sell: ${JSON.stringify(response.data[vp].sell)}` + `\n\n`, e => {
  //         if(e) throw e
  //       })
  //     } else {
  //       fs.appendFile(`${vp}_ticker.txt`, `Buy: ${JSON.stringify(response.data[vp].buy)} Sell: ${JSON.stringify(response.data[vp].sell)}` + '\n\n', e => {
  //         if(e) throw e
  //       })
  //     }
  //   })
  //   .catch(e => console.log(e))
  // }, 1200)
})
