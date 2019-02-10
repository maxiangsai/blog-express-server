const mongoose = require('mongoose');
const Promise = require('bluebird');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

const Schema = mongoose.Schema;
// flag: 0置顶 1首页 2非首页 3草稿
const ArticleSchema = new Schema({
  title: {
    required: true,
    type: String
  },
  content: {
    required: true,
    type: String
  },
  posterImg: {
    type: String,
    required: true
  },
  summary: {
    type: String
  },
  likeNum: {
    type: Number,
    default: 0
  },
  previousArticle: {
    type: Object,
    default: null
  },
  nextArticle: {
    type: Object,
    default: null
  },
  flag: {
    type: Number,
    default: 3
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }]
}, {
  timestamps: true
})

ArticleSchema.statics = {
  get (id) {
    return this.findById(id)
      .populate({
        path: 'tags',
        select: 'id name'
      })
      .then(article => {
        console.log(article)
        if (article) {
          return article;
        }
        const err = new APIError(httpStatus.NOT_FOUND, '该文章不存在!', true);
        return Promise.reject(err);
      })
  },
  list (findOption, { skip = 0, limit = 10 } = {}) {
    return this.find(findOption)
      .populate({
        path: 'tags',
        select: 'id name'
      })
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
}

module.exports = mongoose.model('Article', ArticleSchema);
