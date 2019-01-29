'use strict';
const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/users')
const JWT = require('jsonwebtoken');

const {tokenVerify} = require('../utils/router-helper');

/**
 * @api {post} /users/register 用户注册
 * @apiGroup User
 * @apiParam {string} username用户名
 * @apiParam {string} password密码
 * @apiSampleRequest /users/register
 * @apiSuccessExample {json} Success-Response:
 *    {
 *      id: '',
 *      username: '',
 *      password: ''
 *    }
 * @apiErrorExample {json} Error-Response:
 *    errMsg: ""
 */
router.post('/register', userCtrl.create);

/**
 * @api {post} /users/login 用户登录
 * @apiGroup User
 * @apiParam {string} username
 * @apiParam {string} password
 */
router.post('/login', userCtrl.login)

/**
 * @api {post} /users 个人信息
 * @apiGroup User
 * @apiParam {string} username
 * @apiParam {string} password
 * @apiParam {string} avatar
 * @apiParam {string} access
 */
router.get('/', userCtrl.tokenVerify, userCtrl.get)
module.exports = router;
