const { env } = process
module.exports = {
  host: env.HOST,
  port: env.PORT,
  jwtSecret: env.JWT_SECRET,
  tokenExpire: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60, // token过期时间
  mongo: {
    host: env.MONGO_URI
  }
}
