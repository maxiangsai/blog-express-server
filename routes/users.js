'use strict'
const Joi = require('joi')
const routeHelper = require('../utils/route-helper')
const userCtrl = require('../controller/users')

const GROUP_NAME = '/user'
module.exports = [
  // 获取个人信息
  {
    method: 'GET',
    path: `${GROUP_NAME}Info`,
    options: {
      tags: ['api', 'users'],
      validate: {
        headers: routeHelper.headers,
        query: {
          userId: Joi.string()
        }
      }
    },
    handler: userCtrl.get
  },
  // 登录
  {
    method: 'POST',
    path: `${GROUP_NAME}/login`,
    options: {
      auth: false,
      tags: ['api', 'users'],
      validate: {
        payload: {
          username: Joi.string().required(),
          password: Joi.string().required()
        }
      }
    },
    handler: userCtrl.login
  }
]
