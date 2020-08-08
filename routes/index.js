'use strict';
const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const articleRouter = require('./article');
const categoryRouter = require('./category');
const uploadRouter = require('./upload');
const searchRouter = require('./search');

// 用户相关路由
router.use('/user', usersRouter);
// 文章相关路由
router.use(articleRouter);
// 标签相关路由
router.use('/categories', categoryRouter);
// 上传相关
router.use('/upload', uploadRouter);
// 搜索相关
router.use('/search', searchRouter);
module.exports = router;
