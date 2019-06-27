const config = require('../config')
const validate = async (decoded, request) => {
  console.log(decoded)
}

module.exports = server => {
  server.auth.strategy('jwt', 'jwt', {
    key: config.jwtSecret,
    validate
  })
  server.auth.default('jwt')
}
