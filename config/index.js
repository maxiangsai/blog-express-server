require('env2')('./.env')
const { env } = process
module.exports = {
  host: env.HOST,
  port: env.PORT,
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: Math.floor(new Date().getTime() / 1000) + 1 * 24 * 60 * 60
  },
  mongoUri: env.MONGO_URI
}
