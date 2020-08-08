const mongoose = require('mongoose');
const APIError = require('../utils/APIError');
const httpStatus = require('http-status');
const Promise = require('bluebird');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

CategorySchema.statics = {
  create (body) {
    return this.findOne(body)
      .exec()
      .then(tag => {
        if (tag) {
          const err = new APIError(httpStatus.BAD_REQUEST, '该标签已存在!', true);
          return Promise.reject(err);
        }
        return tag;
      })
  },

  list () {
    return this.find()
      .sort({
        'updateAt': -1
      })
      .exec()
      .then(category => {
        return category;
      })
  }
}
module.exports = mongoose.model('Category', CategorySchema);
