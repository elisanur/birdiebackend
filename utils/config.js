require('dotenv').config({ path: './.env' })

let PORT = process.env.PORT
let MONGOURL = process.env.MONGOURL
let SECRET = process.env.SECRET

if(process.env.NODE_ENV === 'test'){
  MONGOURL = process.env.TEST_MONGOURL
}

module.exports = {
  MONGOURL,
  PORT,
  SECRET
}