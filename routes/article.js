const express = require('express');
const articleCtrl = require('../controller/article');
const tokenVerify = require('../middleware/verifyToken');
const validate = require('express-validation');
const paramValidation = require('../utils/param-validation');
const flag = require('../middleware/flag');

const router = express.Router()

router.route('/')
  // 首页文章列表
  .get(tokenVerify, flag('index'), articleCtrl.list)
  // 创建文章 /v1/articles
  .post(validate(paramValidation.createArticle), tokenVerify, articleCtrl.create);

// /v1/articles/:id
router.route('/:id')
  // 文章详情
  .get(tokenVerify, articleCtrl.getArticle)
  // 修改文章
  .put(validate(paramValidation.updateArticle), tokenVerify, articleCtrl.update)
  // 删除文章
  .delete(validate(paramValidation.idCheck), tokenVerify, articleCtrl.remove);

// router.param('id', articleCtrl.load);
module.exports = router;
