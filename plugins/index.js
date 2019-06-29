const hapiAuthJWT2 = require('hapi-auth-jwt2')
const pluginAuthJWT2 = require('./hapi-auth-jwt2')

const inert = require('inert')
const vision = require('vision')
const hapiSwagger = require('hapi-swagger')

const package = require('package')
module.exports = async server => {
  // 注册插件
  await server.register([
    hapiAuthJWT2,
    inert,
    vision,
    {
      plugin: hapiSwagger,
      options: {
        info: {
          title: '接口文档',
          version: package.version
        },
        grouping: 'tags'
      },
      tags: [
        {
          name: 'users',
          description: '测试相关'
        },
        {
          name: 'article',
          description: '文章相关接口'
        },
        {
          name: 'tag',
          description: '标签相关接口'
        }
      ]
    }
  ])
  // token验证插件
  pluginAuthJWT2(server)
}
