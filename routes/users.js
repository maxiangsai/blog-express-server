'use strict';
const express = require('express');
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const router = express.Router();
const models = require('../models')

const {tokenVerify} = require('../utils/router-helper')

const config = require('../config')
const saltRounds = 10

/**
 * @api {post} /users/register 用户注册
 * @apiGroup User
 * @apiParam {string} username用户名
 * @apiParam {string} password密码
 * @apiSampleRequest /users/register
 * @apiSuccessExample {json} Success-Response:
 *    data: {
 *      id: '',
 *      username: '',
 *      password: ''
 *    }
 * @apiErrorExample {json} Error-Response:
 *    errMsg: ""
 */
router.post('/register', async (req, res, next) => {
  const { body: { username, password } } = req
  if (username === '') {
    return res.status(400).json({
      errMsg: '用户名不能为空!'
    });
  }
  if (String(password).length < 6) {
    return res.status(400).send({
      errMsg: '密码不能少于6位!'
    });
  }
  const user = await models.users.findOne({
    where: { username }
  })
  if (user) {
    if (user.username === username) {
      return res.status(400).send({
        errMsg: '用户名已存在!'
      })
    }
  } else {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) throw err;
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) throw err;
        models.users.create({
          username,
          password: hash
        }).then(data => {
          res.send({
            data
          })
        }).catch(e => console.log(e))
      });
    });
  }
});

/**
 * @api {post} /users/login 用户登录
 * @apiGroup User
 * @apiParam {string} username
 * @apiParam {string} password
 */
router.post('/login', async (req, res, next) => {
  const { body: { username, password } } = req;
  const user = await models.users.findOne({
    where: { username }
  });

  if (!user) {
    return res.status(404).send({
      errMsg: '用户不存在'
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send({ errMsg: '您输入的密码错误!' });
  }
  // 签发 jwt
  const generateJWT = (jwtInfo) => {
    const payload = {
      userId: jwtInfo.userId,
      exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60 // 7天过期
    }
    return JWT.sign(payload, config.jwtSecret)
  }
  res.send({
    token: generateJWT({
      userId: user.id
    })
  })
})

router.get('/list', tokenVerify, (req, res, next) => {
  // token验证通过，在req.userId中获取到对应解密的userId
  res.send({message: req.userId})
})
module.exports = router;
