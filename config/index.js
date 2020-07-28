const { parsed: { HOST, PORT, MONGO_URI } } = require('dotenv').config();

module.exports = {
  host: HOST,
  port: PORT,
  mongoUri: MONGO_URI
}
