'use strict'
// 引入第三方包
const Hapi = require('hapi')
const mongoose = require('mongoose')

// 引入配置
const registerPlugins = require('./plugins')
const userRoutes = require('./routes/users')
const config = require('./config')
const { port, host, mongo } = config

const server = Hapi.server({
  port,
  host
})

const init = async () => {
  // 注册插件
  await registerPlugins(server)
  // 注册路由
  server.route([...userRoutes])
  // 连接mongodb数据库
  const mongoUri = `${mongo.host}:${mongo.port}/${mongo.databaseName}`
  mongoose.connect(mongoUri, { useNewUrlParser: true })
  mongoose.connection.on('error', () => {
    throw new Error(`无法连接到数据库：${mongoUri}`)
  })
  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

// process.on('unhandledRejection', err => {
//   console.log(err)
//   process.exit(1)
// })
// 启动服务器
init()
