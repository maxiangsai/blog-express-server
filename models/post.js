const mongoose = require('mongoose');
const Promise = require('bluebird');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

const Schema = mongoose.Schema;
// state: 1发布 0草稿
const PostSchema = new Schema({
  title: {
    required: true,
    type: String
  },
  content: {
    required: true,
    type: String
  },
  cover: {
    type: String,
    default: 'http://img.ydman.cn/img_1.jpg'
  },
  description: {
    type: String
  },
  state: {
    type: Number,
    default: 0
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }]
}, {
  timestamps: true
})

PostSchema.statics = {
  get (id) {
    return this.findById(id)
      .populate({
        path: 'categories',
        select: 'id name'
      })
      .then(article => {
        if (article) {
          return article;
        }
        const err = new APIError(httpStatus.NOT_FOUND, '该文章不存在!', true);
        return Promise.reject(err);
      })
  },
  list (findOption = {}, filterOption) {
    // 默认查询发布状态的
    findOption = {
      state: {$ne: 0},
      ...findOption
    }
    filterOption = {
      title: 1,
      summary: 1,
      posterImg: 1,
      ...filterOption
    }
    return Promise.all([
      this.find(findOption, filterOption).exec(),
      this.find(findOption, filterOption).populate({
        path: 'categories',
        select: 'id name'
      })
      .sort({ createdAt: 1 })
      .exec()
    ]).then(result => {
      const [all, data] = result
      return { total: all.length, data }
    })
  }
}

module.exports = mongoose.model('Post', PostSchema);
