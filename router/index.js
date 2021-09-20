'use strict';
const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const articleRouter = require('./article');

// 用户相关路由
router.use(userRouter);
// 文章相关路由
router.use('/articles', articleRouter);
// 上传相关
// router.use('/upload', uploadRouter);

module.exports = router;
