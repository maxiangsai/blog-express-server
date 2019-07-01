'use strict'
// 引入第三方包
const Hapi = require('hapi')
const mongoose = require('mongoose')

// 插件
const registerPlugins = require('./plugins')
// 路由
const userRoutes = require('./routes/users')
const articleRoutes = require('./routes/article')
const tagRoutes = require('./routes/tag')
const searchRoutes = require('./routes/search')
const uploadRoutes = require('./routes/upload')

// 配置
const config = require('./config')
const { port, host, mongoUri } = config

const server = Hapi.server({
  port,
  host
})

const init = async () => {
  // 注册插件
  await registerPlugins(server)
  // 注册路由
  server.route([...userRoutes, ...articleRoutes, ...tagRoutes, ...searchRoutes, ...uploadRoutes])
  // 连接mongodb数据库
  mongoose.connect(mongoUri, { useNewUrlParser: true })
  mongoose.connection.on('error', () => {
    throw new Error(`无法连接到数据库：${mongoUri}`)
  })
  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', err => {
  console.log('server -- ', err)
  process.exit(1)
})
// 启动服务器
init()
