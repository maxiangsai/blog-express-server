require('env2')('./.env')
const { env } = process
module.exports = {
  host: env.HOST,
  port: env.PORT,
  mongoUri: env.MONGO_URI,
  jwt: {
    secret: env.JWT_SECRET,
    expire: 60 * 60
  }
}
