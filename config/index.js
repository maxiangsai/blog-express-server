require('env2')('./.env')
const { env } = process
module.exports = {
  host: env.HOST,
  port: env.PORT,
  mongo: {
    host: env.MONGO_HOST,
    port: env.MONGO_PORT,
    databaseName: env.MONGO_DATABASE_NAME
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: '1h'
  }
}
