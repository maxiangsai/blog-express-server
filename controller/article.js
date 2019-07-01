const Boom = require('boom')
const Article = require('../models/article')

/**
 * keyword 关键词查询
 * state 0草稿 1发布（默认1）
 */
const getList = async (req, h) => {
  try {
    const {
      query: { limit = 10, page = 1, state = 1, keyword }
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
    const data = await Article.list(findOptions, null)
      .skip(skip)
      .limit(+limit)
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
        code: 200,
        data: list
      })
    })
}

/**
 * 文章详情
 */
const getArticle = (req, res, next) => {
  return res.json({
    code: 200,
    data: req.article
  })
}

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
const create = (req, res, next) => {
  let body = req.body
  const article = new Article(body)
  article
    .save()
    .then(resArticle => res.json({ code: 200, data: resArticle }))
    .catch(e => next(e))
}

/**
 * 修改文章
 */
const update = (req, res, next) => {
  const article = req.article // 文章实例
  article.title = req.body.title
  article.content = req.body.content
  article.summary = req.body.summary
  article.posterImg = req.body.posterImg
  article.state = req.body.state
  article.tags = req.body.tags

  article
    .save(article)
    .then(savedArticle => res.json({ code: 200, data: savedArticle }))
    .catch(e => next(e))
}

const remove = (req, res, next) => {
  const article = req.article
  article
    .remove()
    .then(savedArticle => res.json({ code: 200, data: savedArticle }))
    .catch(e => next(e))
}

module.exports = {
  list,
  getList,
  getArticle,
  getArticlesByTime,
  create,
  update,
  remove,
  getArticleById
}
