const Article = require('../models/article');

// flag: 0置顶 1首页 2非首页 3草稿

const list = (req, res, next) => {
  let {
    keyword = '',
    page = 1,
    limit = 10
  } = req.params
  keyword = decodeURIComponent(keyword);
  limit = Number(limit);
  let findOption = {};
  let flag = res.locals.flag;
  let skip = Number((page - 1) * limit) || 0;
  let reg = new RegExp(keyword, 'i');
  if (keyword) {
    // 通过keyword查询
    findOption = {
      flag: {
        $ne: 3
      },
      $or: [{
        title: {
          $regex: reg
        }
      }, {
        content: {
          $regex: reg
        }
      }]
    }
  } else {
    // 所有文章
    findOption = {
      flag
    }
  }
  Article.list(findOption, null, { skip, limit }).then(data => {
    res.json({
      code: 200,
      data: data.data,
      total: data.total
    })
  }).catch(e => next(e))
}

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
  });
}

const load = (req, res, next) => {
  const { id } = req.params
  return Article.get(id)
    .then(article => {
      req.article = article;
      return next();
    })
    .catch(e => next(e));
}

/**
 * 创建文章
 */
const create = (req, res, next) => {
  let body = req.body
  const article = new Article(body)
  article.save()
    .then(resArticle => res.json({ code: 200, data: resArticle }))
    .catch(e => next(e));
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
  article.flag = req.body.flag
  article.tags = req.body.tags

  article.save(article)
    .then(savedArticle => res.json({ code: 200, data: savedArticle }))
    .catch(e => next(e));
}

const remove = (req, res, next) => {
  const article = req.article;
  article.remove()
    .then(savedArticle => res.json({ code: 200, data: savedArticle }))
    .catch(e => next(e));
}

module.exports = {
  list,
  getArticle,
  getArticlesByTime,
  create,
  update,
  remove,
  load
}
