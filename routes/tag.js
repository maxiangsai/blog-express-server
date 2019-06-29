const Joi = require('joi')
const tagCtrl = require('../controller/tag')

// router
//   .route('/')
//   .get(tagCtrl.get)
//   .post(validate(paramValid.createTag), tokenVerify, tagCtrl.create)
//   .put(validate(paramValid.updateTag), tokenVerify, tagCtrl.update)
//   .delete(validate(paramValid.deleteTag), tokenVerify, tagCtrl.remove)

// 获取每个标签下的文章列表
// router.route('/:id').get(tagCtrl.getName, tagCtrl.getListByTag)

const GROUP_NAME = '/tag'
module.exports = [
  {
    method: 'GET',
    path: `${GROUP_NAME}`,
    options: {
      tags: ['api', 'tag'],
      auth: false
    },
    handler: tagCtrl.get
  },
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
  }
]
