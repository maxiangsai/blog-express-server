// const express = require('express');
const Joi = require('joi')
const routeHelper = require('../utils/route-helper')
const articleCtrl = require('../controller/article')
// const tokenVerify = require('../middleware/verifyToken');
// const validate = require('express-validation');
// const paramValidation = require('../utils/param-validation');

// const router = express.Router();

// router.route('/')
//   // 首页文章列表
//   .get(articleCtrl.list)
//   // 文章归档（按时间归类）
//   // 创建文章 /v1/articles
//   .post(validate(paramValidation.createArticle), tokenVerify, articleCtrl.create);

// // /v1/articles/:id
// router.route('/:id')
//   // 文章详情
//   .get(articleCtrl.getArticle)
//   // 修改文章
//   .put(validate(paramValidation.updateArticle), tokenVerify, articleCtrl.update)
//   // 删除文章
//   .delete(validate(paramValidation.idCheck), tokenVerify, articleCtrl.remove);
// router.param('id', articleCtrl.load);
// module.exports = router;
const GROUP_NAME = '/articles'
module.exports = [
  // 获取列表
  {
    method: 'GET',
    path: `${GROUP_NAME}`,
    options: {
      tags: ['api', 'article'],
      auth: false,
      validate: {
        query: {
          state: Joi.number().integer(),
          ...routeHelper.pagination
        }
      }
    },
    handler: articleCtrl.getList
  },
  // 通过id查询文章
  {
    method: 'GET',
    path: `${GROUP_NAME}/{id}`,
    options: {
      tags: ['api', 'article'],
      auth: false,
      validate: {
        params: {
          id: Joi.string().required()
        }
      }
    },
    handler: articleCtrl.getArticleById
  },
  {
    method: 'POST',
    path: `${GROUP_NAME}`,
    options: {
      tags: ['api', 'article'],
      validate: {
        payload: Joi.object({
          content: Joi.string().required(),
          title: Joi.string().required(),
          posterImg: Joi.string().required(),
          summary: Joi.string().required(),
          tags: Joi.array().required(),
          state: Joi.number()
            .integer()
            .required()
        })
      }
    },
    handler: articleCtrl.create
  },
  // 更新文章
  {
    method: 'PUT',
    path: `${GROUP_NAME}/{id}`,
    options: {
      tags: ['api', 'article'],
      validate: {
        params: {
          id: Joi.string().required()
        }
      }
    },
    handler: articleCtrl.update
  },
  // 删除文章（硬删除，空间有限）
  {
    method: 'DELETE',
    path: `${GROUP_NAME}/{id}`,
    options: {
      tags: ['api', 'article'],
      validate: {
        params: {
          id: Joi.string().required()
        }
      }
    },
    handler: articleCtrl.remove
  }
]
