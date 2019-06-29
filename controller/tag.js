const Tag = require('../models/tag')
const Article = require('../models/article')

const get = (req, h) => {
  return Tag.list()
    .then(list => {
      return {
        code: 200,
        data: list
      }
    })
    .catch(e => {
      throw e
    })
}

const create = (req, h) => {
  const { payload } = req
  return Tag.create(payload)
    .then(t => {
      const tag = new Tag(payload)
      tag
        .save()
        .then(savedTag => {
          return {
            code: 200,
            data: savedTag
          }
        })
        .catch(e => {
          throw e
        })
    })
    .catch(e => {
      throw e
    })
}

const update = (req, h) => {
  const { payload } = req
  Tag.findByIdAndUpdate(payload.id, payload, { new: true })
    .exec()
    .then(tag => ({ code: 200, data: tag }))
    .catch(e => {
      throw e
    })
}

const remove = (req, h) => {
  const { payload } = req
  Tag.findByIdAndRemove(payload.id)
    .exec()
    .then(tag => {
      return {
        code: 200,
        data: tag
      }
    })
    .catch(e => {
      throw e
    })
}

const getName = (req, h) => {
  const {
    params: { id }
  } = req
  Tag.findById(id)
    .then(tag => {
      return {
        statusCode: 200,
        data: {
          ...tag
        }
      }
    })
    .catch(e => {
      throw e
    })
}

/**
 * 根据tag id查询对应文章列表
 */
const getListByTag = (req, h) => {
  const { id } = req.params
  Article.list({
    tags: id
  })
    .then(ret => {
      res.json({
        code: 200,
        ...ret
      })
    })
    .catch(e => {
      throw e
    })
}

module.exports = {
  get,
  getName,
  getListByTag,
  create,
  update,
  remove
}
