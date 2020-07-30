const { GraphQLID } = require('graphql');
const ArticleGraphQLType = require('../types/articleType');
const Article = require('../../models/article');

module.exports = {
  type: ArticleGraphQLType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return Article.findById(args.id);
  }
};

