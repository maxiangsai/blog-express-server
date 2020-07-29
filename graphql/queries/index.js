const { GraphQLObjectType } = require('graphql');

const queryArticleById = require('./queryArticleById');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    queryArticleById
  }
});

module.exports = RootQuery;
