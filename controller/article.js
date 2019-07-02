const Boom = require('boom')
const Article = require('../models/article')

/**
 * keyword 关键词查询
 * state 0草稿 1发布（默认1）
 */
const getList = async (req, h) => {
  try {
    const {
      query: { limit, page, state = 1, keyword }
    } = req
    const skip = (page - 1) * limit
    let findOptions = {
      state
    }

    if (keyword) {
      findOptions = {
        keyword,
        ...findOptions
      }
    }
    const data = await Article.list(findOptions, null, { skip, limit })
    return {
      statusCode: 200,
      ...data
    }
  } catch (error) {
    return Boom.badRequest(error)
  }
}

/**
 * 按时间归档
 */
const getArticlesByTime = (req, res, next) => {
  const filterOption = {
    title: 1,
    summary: 1,
    posterImg: 1
  }
  Article.find({}, filterOption)
    .sort({
      createdAt: -1
    })
    .then(list => {
      res.json({
        statusCode: 200,
        data: list
      })
    })
}

/**
 * 文章详情
 */
const getArticleById = (req, h) => {
  const { id } = req.params
  return Article.get(id)
    .then(article => {
      return {
        statusCode: 200,
        data: article
      }
    })
    .catch(e => {
      return Boom.notFound(e)
    })
}

/**
 * 创建文章
 */
const create = (req, h) => {
  let { payload } = req
  const article = new Article(payload)
  return article
    .save()
    .then(resArticle => ({ statusCode: 200, data: resArticle }))
    .catch(e => Boom.badImplementation(e))
}

/**
 * 修改文章
 */
const update = (req, h) => {
  const { payload } = req
  Article.findByIdAndUpdate(payload.id, payload, { new: true })
    .exec()
    .then(savedArticle => res.json({ statusCode: 200, data: savedArticle }))
    .catch(e => Boom.badImplementation(e))
}

const remove = (req, h) => {
  const { params } = req
  return Article.findByIdAndRemove(params.id)
    .exec()
    .then(savedArticle => ({ statusCode: 200, data: savedArticle }))
    .catch(e => Boom.badImplementation(e))
}

module.exports = {
  getList,
  getArticlesByTime,
  create,
  update,
  remove,
  getArticleById
}
