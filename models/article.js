const mongoose = require('mongoose')

const Schema = mongoose.Schema
// state: 1发布 0草稿
const ArticleSchema = new Schema(
  {
    // 标题
    title: {
      required: true,
      type: String
    },
    // 内容
    content: {
      required: true,
      type: String
    },
    // 封面图片
    posterImg: {
      type: String,
      required: true
    },
    // 摘要
    summary: {
      type: String
    },
    // 点赞数
    likeNum: {
      type: Number,
      default: 0
    },
    // 上一篇
    previousArticle: {
      type: Object,
      default: null
    },
    // 下一篇
    nextArticle: {
      type: Object,
      default: null
    },
    // 状态 -- 0草稿 1发布
    state: {
      type: Number,
      default: 1
    },
    // 标签
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
      }
    ]
  },
  {
    timestamps: true
  }
)

ArticleSchema.statics = {
  get(id) {
    return this.findById(id)
      .populate({
        path: 'tags',
        select: 'id name'
      })
      .then(article => {
        if (article) {
          return article
        }
        const err = new APIError(httpStatus.NOT_FOUND, '该文章不存在!', true)
        return Promise.reject(err)
      })
  },
  /**
   *
   * @param {object} findOption 查询参数
   * @param {object} param1
   * @param {object} filterOption 需要过滤掉的参数 = 0, 需要的参数 = 1
   */
  list(findOption, filterOption, { skip = 0, limit = 10 }) {
    const filterOpts = {
      title: 1,
      summary: 1,
      posterImg: 1,
      ...filterOption
    }
    return Promise.all([
      this.find(findOption, filterOpts).exec(),
      this.find(findOption, filterOpts)
        .populate({
          path: 'tags',
          select: 'id name'
        })
        .sort({ createdAt: -1 })
        .skip(+skip)
        .limit(+limit)
        .exec()
    ])
      .then(result => {
        const [all, data] = result
        const totalPage = all.length / limit
        return { total: all.length, totalPage, data }
      })
      .catch(e => {
        console.log(e)
        throw e
      })
  }
}

module.exports = mongoose.model('Article', ArticleSchema)
