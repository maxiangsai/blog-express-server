const { GraphQLList } = require('graphql');
const articleGraphQLType = require('../types/articleType');
const Article = require('../../models/article');

module.exports = {
  type: new GraphQLList(articleGraphQLType),
  args: {},
  resolve() {
    return Article.find({});
  }
};

