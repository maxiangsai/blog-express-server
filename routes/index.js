'use strict';
const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const articleRouter = require('./article');
const tagRouter = require('./tag');
const uploadRouter = require('./upload');
const searchRouter = require('./search')

// 用户相关路由
router.use('/users', usersRouter);
// 文章相关路由
router.use('/articles', articleRouter);
// 标签相关路由
router.use('/tags', tagRouter);
// 上传相关
router.use('/upload', uploadRouter);
// 搜索相关
router.use('/search', searchRouter);
module.exports = router;
