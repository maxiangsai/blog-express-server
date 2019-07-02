const Joi = require('joi')
const routeHelper = require('../utils/route-helper')
const tagCtrl = require('../controller/tag')

const GROUP_NAME = '/tag'
module.exports = [
  // 获取tag列表
  {
    method: 'GET',
    path: `${GROUP_NAME}s`,
    options: {
      tags: ['api', 'tag'],
      auth: false
    },
    handler: tagCtrl.get
  },
  // 删除单个tag
  {
    method: 'DELETE',
    path: `${GROUP_NAME}`,
    options: {
      tags: ['api', 'tag'],
      validate: {
        payload: {
          id: Joi.string().required()
        }
      }
    },
    handler: tagCtrl.remove
  },
  // 创建tag
  {
    method: 'POST',
    path: `${GROUP_NAME}`,
    options: {
      tags: ['api', 'tag'],
      validate: {
        headers: routeHelper.headers,
        payload: {
          name: Joi.string().required()
        }
      }
    },
    handler: tagCtrl.create
  },
  // 更新tag
  {
    method: 'PUT',
    path: `${GROUP_NAME}`,
    options: {
      tags: ['api', 'tag'],
      validate: {
        payload: {
          id: Joi.string().required(),
          name: Joi.string().required()
        }
      }
    },
    handler: tagCtrl.update
  }
]
