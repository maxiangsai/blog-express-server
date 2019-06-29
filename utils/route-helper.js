'use strict'

const Joi = require('joi')

module.exports = {
  headers: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),

  pagination: Joi.object({
    page: Joi.number()
      .integer()
      .min(1)
      .default(1),
    limit: Joi.number()
      .integer()
      .min(1)
      .default(10)
  })
}
