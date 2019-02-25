const mongoose = require('mongoose');
const Promise = require('bluebird');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

const Schema = mongoose.Schema;
// state: 1发布 0草稿
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
  state: {
    type: Number,
    default: 0
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
        if (article) {
          return article;
        }
        const err = new APIError(httpStatus.NOT_FOUND, '该文章不存在!', true);
        return Promise.reject(err);
      })
  },
  list (findOption, filterOption, { skip = 0, limit = 10 } = {}) {
    filterOption = Object.assign({
      title: 1,
      summary: 1,
      posterImg: 1
    }, filterOption)
    return Promise.all([
      this.find(findOption, filterOption).exec(),
      this.find(findOption, filterOption).populate({
        path: 'tags',
        select: 'id name'
      })
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec()
    ]).then(result => {
      const [all, data] = result
      return { total: all.length, data }
    })
  }
}

module.exports = mongoose.model('Article', ArticleSchema);
