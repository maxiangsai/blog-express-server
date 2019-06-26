'use strict'
const userCtrl = require('../controller/users')
// const tokenVerify = require('../middleware/verifyToken')
// const paramValidation = require('../utils/param-validation')

// const router = new Router()

// router.post('/register', validation(paramValidation.createUser), userCtrl.create)
// /**
//  * @api {post} /users/login 用户登录
//  * @apiGroup User
//  * @apiParam {string} username
//  * @apiParam {string} password
//  */
// router.post('/login', validation(paramValidation.login), userCtrl.login)

// /**
//  * @api {post} /users 个人信息
//  * @apiGroup User
//  * @apiParam {string} username
//  * @apiParam {string} password
//  * @apiParam {string} avatar
//  * @apiParam {string} access
//  */
// router.get('/', tokenVerify, userCtrl.get)

const GROUP_NAME = '/user'
module.exports = [
  {
    method: 'GET',
    path: `${GROUP_NAME}/{userId}`,
    handler: userCtrl.get
  },
  {
    method: 'POST',
    path: `${GROUP_NAME}/login`,
    handler: userCtrl.login
  }
]
