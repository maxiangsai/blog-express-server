const hapiAuthJWT2 = require('hapi-auth-jwt2')
const pluginAuthJWT2 = require('./hapi-auth-jwt2')
module.exports = async server => {
  // 注册插件
  await server.register([hapiAuthJWT2])
  // token验证插件
  pluginAuthJWT2(server)
}
