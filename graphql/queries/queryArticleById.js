const { GraphQLObjectType } = require('graphql');
const { GraphQLString } = require('graphql');
const ArticleGraphQLType = require('../types/articleType');
const Article = require('../../models/article');

module.exports = {
  type: ArticleGraphQLType,
  args: { id: { type: GraphQLString } },
  resolve(parent, args) {
    return Article.findById(args.id)
  }
}
