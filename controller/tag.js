const Tag = require('../models/tag')
const Boom = require('boom')

const get = (req, h) => {
  return Tag.list()
    .then(list => {
      return {
        statusCode: 200,
        data: list
      }
    })
    .catch(e => Boom.badImplementation(e))
}

const create = (req, h) => {
  const { payload } = req
  return Tag.create(payload)
    .then(t => {
      const tag = new Tag(payload)
      return tag.save().then(savedTag => {
        return {
          statusCode: 200,
          data: savedTag
        }
      })
    })
    .catch(e => Boom.badImplementation(e))
}

const update = (req, h) => {
  const { payload } = req
  return Tag.findByIdAndUpdate(payload.id, payload, { new: true })
    .exec()
    .then(tag => ({ statusCode: 200, data: tag }))
    .catch(e => Boom.badImplementation(e))
}

const remove = (req, h) => {
  const {
    payload: { id }
  } = req
  return Tag.findByIdAndRemove(id)
    .exec()
    .then(tag => {
      return {
        statusCode: 200,
        data: tag
      }
    })
    .catch(e => Boom.badImplementation(e))
}

module.exports = {
  get,
  create,
  update,
  remove
}
