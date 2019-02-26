const express = require('express');
const articleCtrl = require('../controller/article');
const tokenVerify = require('../middleware/verifyToken');
const validate = require('express-validation');
const paramValidation = require('../utils/param-validation');
const state = require('../middleware/state');

const router = express.Router();

router.route('/')
  // 首页文章列表
  .get(state('index'), articleCtrl.list)
  // 文章归档（按时间归类）
  // 创建文章 /v1/articles
  .post(validate(paramValidation.createArticle), tokenVerify, articleCtrl.create);

// /v1/articles/:id
router.route('/:id')
  // 文章详情
  .get(articleCtrl.getArticle)
  // 修改文章
  .put(validate(paramValidation.updateArticle), tokenVerify, articleCtrl.update)
  // 删除文章
  .delete(validate(paramValidation.idCheck), tokenVerify, articleCtrl.remove);

// 草稿
router.route('/draft', state('draft'), articleCtrl.list)
router.put('/draft', state('draft'), validate(paramValidation.updateArticle), articleCtrl.update)
router.param('id', articleCtrl.load);
module.exports = router;
