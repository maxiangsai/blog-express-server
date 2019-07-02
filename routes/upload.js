const Joi = require('joi')
const qiniuConfig = require('../config/qiniu')

const GROUP_NAME = '/upload'
module.exports = [
  // 上传需要的token
  {
    method: 'GET',
    path: `${GROUP_NAME}/token`,
    options: {
      validate: {
        query: {
          key: Joi.string().required()
        }
      }
    },
    handler: (req, h) => {
      const {
        query: { key }
      } = req
      const token = qiniuConfig.uptoken(key)
      return {
        code: 200,
        data: token
      }
    }
  }
]
