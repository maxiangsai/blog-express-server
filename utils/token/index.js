const config = require('../../config');
const jwt = require('jsonwebtoken');

const { secret, expiresIn } = config.jwt
exports.sign = (user) => {
  const token = jwt.sign({
    username: user.username,
    userId: user.id
  }, secret, {
    expiresIn
  })
  return token
}

exports.verify = (token) => {
  const decoded = jwt.verify(token, secret)
  return decoded
}
