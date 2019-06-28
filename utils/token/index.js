const config = require('../../config')
const jwt = require('jsonwebtoken')

const { secret, expire } = config.jwt
exports.sign = user => {
  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      exp: Math.floor(Date.now() / 1000) + expire
    },
    secret
  )
  return token
}
