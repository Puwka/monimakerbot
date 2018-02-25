const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let value = (callback) => {
  rl.question('Enter crypto: ', answer =>  {
  console.log(`Your crypto is: ${answer}`)
  callback(answer)
  })
}

module.exports = {
  value
}
