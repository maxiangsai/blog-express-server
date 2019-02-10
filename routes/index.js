'use strict';
const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const articleRouter = require('./article');
const tagRouter = require('./tag');
const upload = require('./upload');

// 用户相关路由
router.use('/users', usersRouter);
// 文章相关路由
router.use('/articles', articleRouter);
// 标签相关路由
router.use('/tags', tagRouter);
// 上传相关
router.use('/upload', upload);
module.exports = router;
