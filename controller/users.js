const User = require('../models/users');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const APIError = require('../utils/APIError');
const config = require('../config');

// 验证token获取userId
const tokenVerify = (req, res, next) => {
  const t = req.body.token || req.query.token || req.get('Authorization').split(' ')[1];
  const decoded = jwt.verify(t, config.jwtSecret);
  req.userId = decoded.userId;
  next();
}

/**
 * 个人信息
 */
const get = (req, res, next) => {
  User.get(req.userId)
    .then(user => {
      const { username, avatar, access } = user
      res.json({
        username,
        avatar,
        access
      })
    })
    .catch(e => next(e))
}

/**
 * 创建新用户（注册）
 */
const create = (req, res, next) => {
  const { body: { username, password } } = req
  User.findOne({
    username
  }).then(user => {
    if (user) {
      const err = new APIError(httpStatus.BAD_REQUEST, '该用户名已被注册!', true)
      return next(err)
    } else {
      const newUser = new User({
        username,
        password
      })
      newUser.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e))
    }
  }).catch(e => next(e));
}

/**
 * 用户登录
 */
const login = (req, res, next) => {
  const { body: { username, password } } = req;
  User.findOne({ username })
    .then(user => {
      if (!user) {
        const err = new APIError(httpStatus.NOT_FOUND, '该用户不存在!', true);
        return next(err)
      }
      // 解密与password对比
      User.decryptPwd(password, user.password)
        .then(() => {
          res.json({
            token: jwt.sign({
              userId: user.id,
              exp: config.tokenExpire
            }, config.jwtSecret)
          })
        })
        .catch(err => next(err))
    })
    .catch(e => next(e))
}
module.exports = {
  get,
  create,
  login,
  tokenVerify
}
