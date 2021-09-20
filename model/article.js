const { Schema, model } = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../util/APIError');

// state: 1发布 0草稿
const articleSchema = new Schema({
  title: {
    required: true,
    type: String
  },
  body: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  state: {
    type: Number,
    default: 0
  },
  tagList: [String]
}, {
  timestamps: true
});

articleSchema.statics = {
  get(id) {
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
      });
  },
  list(findOption = {}, filterOption) {
    // 默认查询发布状态的
    findOption = {
      state: { $ne: 0 },
      ...findOption
    };
    filterOption = {
      title: 1,
      summary: 1,
      posterImg: 1,
      ...filterOption
    };
    return Promise.all([
      this.find(findOption, filterOption).exec(),
      this.find(findOption, filterOption).populate({
        path: 'categories',
        select: 'id name'
      })
        .sort({ createdAt: 1 })
        .exec()
    ]).then(result => {
      const [all, data] = result;
      return { total: all.length, data };
    });
  }
};

module.exports = model('Article', articleSchema);
