const Joi = require('joi')
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
  // 获取单个tag
  {
    method: 'GET',
    path: `${GROUP_NAME}/{id}`,
    options: {
      tags: ['api', 'tag'],
      auth: false,
      validate: {
        params: {
          id: Joi.string().required()
        }
      }
    },
    handler: tagCtrl.getName
  },
  // 删除单个tag
  {
    method: 'DELETE',
    path: `${GROUP_NAME}/{id}`,
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
        payload: {
          id: Joi.string().required()
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
          id: Joi.string().required()
        }
      }
    },
    handler: tagCtrl.update
  }
]
