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

let valueB2 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Enter crypto: ', answer =>  {
    console.log(`Your crypto is: ${answer}`)
    resolve(answer)
  })

  })
}

module.exports = {
  value,
  valueB2
}
