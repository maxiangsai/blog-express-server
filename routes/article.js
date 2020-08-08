const express = require('express');
const articleCtrl = require('../controller/article');
const tokenVerify = require('../middleware/verifyToken');
const validate = require('express-validation');
const paramValidation = require('../utils/param-validation');

const router = express.Router();

router.get('/posts',articleCtrl.getList)
  // 文章归档（按时间归类）
  // 创建文章 /v1/articles
router.post('/post',validate(paramValidation.createArticle), tokenVerify, articleCtrl.create);

// /v1/articles/:id
router.get('/posts/:id', articleCtrl.getArticle)
  // 修改文章
router.put('/post/:id',validate(paramValidation.updateArticle), tokenVerify, articleCtrl.update)
  // 删除文章
router.delete('/post/:id',validate(paramValidation.idCheck), tokenVerify, articleCtrl.remove);
router.param('id', articleCtrl.load);
module.exports = router;
