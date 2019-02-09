'use strict';

const Joi = require('joi')

module.exports = {
  idCheck: {
    params: {
      id: Joi.string().required()
    }
  },
  createArticle: {
    body: {
      title: Joi.string().required(),
      content: Joi.string().required(),
      posterImg: Joi.string().required()
    }
  },
  updateArticle: {
    body: {
      title: Joi.string().required(),
      content: Joi.string().required(),
      posterImg: Joi.string().required()
    },
    params: {
      id: Joi.string().required()
    }
  },
  createUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
}
