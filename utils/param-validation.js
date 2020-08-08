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
      state: Joi.number()
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
      cover: Joi.string()
    },
    params: {
      id: Joi.string().required()
    }
  },
  createCategory: {
    body: {
      name: Joi.string().required()
    }
  },
  updateCategory: {
    body: {
      id: Joi.string().required(),
      name: Joi.string().required()
    }
  },
  deleteCategory: {
    body: {
      id: Joi.string().required(),
    }
  },
  search: {
    params: {
      keyword: Joi.string().required()
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
