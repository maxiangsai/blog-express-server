const Promise = require('bluebird');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  access: {
    type: String,
    required: true,
    default: 'admin'
  }
}, {
  timestamps: true
})

UserSchema.statics = {
  /**
   * 根据用户id查找用户
   * @param {number} id
   */
  get (id) {
    return this.findById(id)
      .exec()
      .then(user => {
        if (user) {
          return user;
        }
        const err = new APIError(httpStatus.NOT_FOUND, '该用户不存在!', true);
        return Promise.reject(err);
      })
  },

  decryptPwd (inputPwd, userPwd) {
    return bcrypt.compare(inputPwd, userPwd)
      .then(isMatch => {
        console.log(isMatch)
        if (isMatch) {
          return Promise.resolve();
        }
        const err = new APIError(httpStatus.BAD_REQUEST, '用户名或者密码错误!', true)
        return Promise.reject(err);
      })
  }
}

/**
 * 保存用户信息前进行密码加密
 */
const saltRounds = 10;
UserSchema.pre('save', function(next) {
  const user = this
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash
      next()
    });
  })
})

module.exports = mongoose.model('User', UserSchema);
