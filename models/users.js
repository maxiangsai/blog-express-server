const Promise = require('bluebird');
const mongoose = require('mongoose');
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
    type: String
  },
  access: {
    type: String,
    required: true,
    default: 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.statics = {
  get (id) {
    return this.findById(id)
      .exec()
      .then(user => {
        if (user) {
          return user;
        }
        const err = new APIError(httpStatus.NOT_FOUND, '该用户不存在!');
        return Promise.reject(err);
      })
  }
}

module.exports = mongoose.model('User', UserSchema);
