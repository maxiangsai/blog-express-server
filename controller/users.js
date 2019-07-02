const User = require('../models/users')
const { sign } = require('../utils/token')
const decrypt = require('../utils/decrypt')
const boom = require('boom')
/**
 * 获取个人信息
 */
const get = (req, h) => {
  const {
    query: { userId }
  } = req
  const id = userId || req.auth.credentials.userId
  return User.get(id)
    .then(({ data }) => {
      return {
        statusCode: 200,
        data
      }
    })
    .catch(() => {
      return boom.notFound('该用户不存在')
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
  const {
    payload: { username, password }
  } = req
  return User.findOne({ username })
    .then(user => {
      // 解密与password对比
      return decrypt(password, user.password).then(() => {
        return {
          statusCode: 200,
          data: {
            token: sign(user)
          }
        }
      })
    })
    .catch(() => {
      return Boom.badRequest('用户名或者密码错误')
    })
}

module.exports = {
  get,
  login
}
