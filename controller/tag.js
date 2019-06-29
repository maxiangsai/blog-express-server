const Tag = require('../models/tag')
const Boom = require('boom')

const get = (req, h) => {
  return Tag.list()
    .then(list => {
      return {
        code: 200,
        data: list
      }
    })
    .catch(e => Boom.badGateway(e))
}

const create = (req, h) => {
  const { payload } = req
  return Tag.create(payload)
    .then(t => {
      const tag = new Tag(payload)
      tag.save().then(savedTag => {
        return {
          code: 200,
          data: savedTag
        }
      })
    })
    .catch(e => Boom.badGateway(e))
}

const update = (req, h) => {
  const { payload } = req
  return Tag.findByIdAndUpdate(payload.id, payload, { new: true })
    .exec()
    .then(tag => ({ code: 200, data: tag }))
    .catch(e => Boom.badGateway(e))
}

const remove = (req, h) => {
  const {
    payload: { id }
  } = req
  return Tag.findByIdAndRemove(id)
    .exec()
    .then(tag => {
      return {
        code: 200,
        data: tag
      }
    })
    .catch(e => Boom.badGateway(e))
}

const getName = (req, h) => {
  const {
    params: { id }
  } = req
  return Tag.findById(id)
    .then(tag => {
      return {
        statusCode: 200,
        data: {
          name: tag.name
        }
      }
    })
    .catch(e => Boom.badRequest(e))
}

module.exports = {
  get,
  getName,
  create,
  update,
  remove
}
