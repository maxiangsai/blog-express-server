const Category = require('../models/category');
const Article = require('../models/post');

const get = (req, res, next) => {
  Category.list().then(list => {
    res.json({
      code: 200,
      data: list
    })
  }).catch(e => next(e));
}

const create = (req, res, next) => {
  Category.create(req.body)
    .then(t => {
      const category = new Category(req.body);
      category.save()
        .then(saved => {
          res.json({
            code: 200,
            data: saved
          });
        })
        .catch(e => next(e));
    })
    .catch(e => next(e));
}

const update = (req, res, next) => {
  const body = req.body
  Category.findByIdAndUpdate(body.id, body, { new: true })
    .exec()
    .then(category => res.json({ code: 200, data: category }))
    .catch(e => next(e));
}

const remove = (req, res, next) => {
  const body = req.body
  Category.findByIdAndRemove(body.id)
    .exec()
    .then(category => {
      res.json({
        code: 200,
        data: category
      })
    }).catch(e => next(e))
}

const getName = (req, res, next) => {
  Category.findById(req.params.id)
    .then(category => {
      req.name = category.name
      next()
    })
    .catch(e => next(e))
}

/**
 * 根据tag id查询对应文章列表
 */
const getListByCategory = (req, res, next) => {
  const { id } = req.params
  const name = req.name
  Article.list({
    categories: id
  }).then(ret => {
    res.json({
      code: 200,
      ...ret,
      name
    })
  })
  .catch(e => next(e))
}

module.exports = {
  get,
  getName,
  getListByCategory,
  create,
  update,
  remove
}
