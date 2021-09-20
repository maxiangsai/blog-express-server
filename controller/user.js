const httpStatus = require('http-status');
const User = require('../model/user');
const APIError = require('../util/APIError');

/**
 * 个人信息
 */
exports.get = (req, res, next) => {
  User.get(req.userId)
    .then(user => {
      console.log(user);
      const { id, username, avatar, access } = user;
      res.json({
        code: 200,
        data: { id, username, avatar, access }
      });
    })
    .catch(e => next(e));
};

/**
 * 创建新用户（注册）
 */
exports.create = (req, res, next) => {
  const { body: { username, password } } = req;
  User.findOne({
    username
  }).then(user => {
    if (user) {
      const err = new APIError(httpStatus.BAD_REQUEST, '该用户名已被注册!', true);
      return next(err);
    } else {
      const newUser = new User({
        username,
        password
      });
      newUser.save()
        .then(savedUser => res.json({ code: 200, data: savedUser }))
        .catch(e => next(e));
    }
  }).catch(e => next(e));
};

/**
 * 用户登录
 */
exports.login = (req, res, next) => {
  const { body: { username, password } } = req;
  User.findOne({ username })
    .then(user => {
      if (!user) {
        const err = new APIError(httpStatus.NOT_FOUND, '该用户不存在!', true);
        return next(err);
      }
      // 解密与password对比
      User.decryptPwd(password, user.password)
        .then(() => {
          res.json({
            code: 200,
            // data: sign(user)
          });
        })
        .catch(err => next(err));
    })
    .catch(e => next(e));
};

/**
 * 更新当前登录用户
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.updateCurrentUser = async (req, res, next) => {
  try {
    res.send('user update');
  } catch (e) {
    next(e);
  }
};
