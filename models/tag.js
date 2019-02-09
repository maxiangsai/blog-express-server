const mongoose = require('mongoose');
const APIError = require('../utils/APIError');
const httpStatus = require('http-status');
const Promise = require('bluebird');

const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

TagSchema.statics = {
  post (body) {
    return this.findOne(body)
      .exec()
      .then(tag => {
        if (tag) {
          const err = new APIError(httpStatus.NOT_FOUND, '该标签已存在!', true);
          return Promise.reject(err);
        }
        return tag;
      })
  }
}
module.exports = mongoose.model('Tag', TagSchema);
