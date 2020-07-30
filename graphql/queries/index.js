const { GraphQLObjectType } = require('graphql');

const getArticleById = require('./getArticleById');
const getTagById = require('./getTagById');
const getAllArticle = require('./getAllArticle');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getArticleById,
    getAllArticle,
    getTagById
  }
});

module.exports = RootQuery;
