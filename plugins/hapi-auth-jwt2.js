const config = require('../config')
const validate = async (decoded, request) => {
  const { userId, username } = decoded
  if (!userId && !username) {
    return { isValid: false }
  }
  return { isValid: true }
}

module.exports = server => {
  server.auth.strategy('jwt', 'jwt', {
    key: config.jwt.secret,
    validate
  })
  server.auth.default('jwt')
}
