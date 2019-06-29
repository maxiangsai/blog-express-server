'use strict'
const Joi = require('joi')
const paramValid = require('../utils/route-helper')
const userCtrl = require('../controller/users')

const GROUP_NAME = '/user'
module.exports = [
  {
    method: 'GET',
    path: `${GROUP_NAME}/{userId}`,
    options: {
      tags: ['api', 'users'],
      validate: {
        params: {
          userId: Joi.string().required()
        },
        headers: paramValid.headers
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
  // 注册
  // {
  //   method: 'POST',
  //   path: `${GROUP_NAME}/register`,
  //   handler: userCtrl.register
  // }
]
