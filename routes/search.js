const Joi = require('joi')
const articleCtrl = require('../controller/article')

const GROUP_NAME = '/search'
module.exports = [
  {
    method: 'GET',
    path: `${GROUP_NAME}`,
    options: {
      validate: {
        query: {
          keyword: Joi.string().required()
        }
      }
    },
    handler: articleCtrl.getList
  }
]
