const User = require('../models/users')
// const { sign } = require('../utils/token')
const httpStatus = require('http-status')
var Boom = require('boom')
const APIError = require('../utils/APIError')
/**
 * 获取个人信息
 */
const get = (req, h) => {
  const { userId } = req.params
  return User.get(userId)
    .then(({ data }) => {
      const { id, username, avatar, access } = data
      return {
        statusCode: 200,
        data: { id, username, avatar, access }
      }
    })
    .catch(() => {
      return Boom.notFound('该用户不存在')
    })
}

/**
 * 创建新用户（注册）
 */
const create = (req, h) => {
  const {
    body: { username, password }
  } = req
  return User.findOne({
    username
  })
    .then(user => {
      if (user) {
        const err = new APIError(httpStatus.BAD_REQUEST, '该用户名已被注册!', true)
        return { err }
      }
      const newUser = new User({
        username,
        password
      })
      return newUser
        .save()
        .then(savedUser => ({ code: 200, data: savedUser }))
        .catch(err => {
          err
        })
    })
    .catch(e => {
      err
    })
}

/**
 * 用户登录
 */
const login = (req, h) => {
  console.log(req.payload)
  const {
    payload: { username, password }
  } = req
  User.findOne({ username })
    .then(user => {
      // 解密与password对比
      User.decryptPwd(password, user.password)
        .then(() => {
          return {
            statusCode: 200,
            data: sign(user)
          }
        })
        .catch(() => Boom.badRequest('用户名或者密码错误'))
    })
    .catch(() => Boom.notFound('该用户不存在'))
}

module.exports = {
  get,
  create,
  login
}
