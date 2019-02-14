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
      posterImg: Joi.string().required(),
      likeNum: Joi.number(),
      flag: Joi.number()
    }
  },
  updateArticle: {
    params: {
      id: Joi.string().required()
    },
    body: {
      summary: Joi.string(),
      title: Joi.string().required(),
      content: Joi.string().required(),
      posterImg: Joi.string().required()
    },
    params: {
      id: Joi.string().required()
    }
  },
  createTag: {
    body: {
      name: Joi.string().required()
    }
  },
  updateTag: {
    body: {
      id: Joi.string().required(),
      name: Joi.string().required()
    }
  },
  deleteTag: {
    body: {
      id: Joi.string().required(),
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
