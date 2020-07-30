const { GraphQLString } = require('graphql');
const ArticleGraphQLType = require('../types/articleType');
const Article = require('../../models/article');

module.exports = {
  type: ArticleGraphQLType,
  args: {
    id: { type: GraphQLString }
  },
  resolve(parent, args) {
    return Article.findOneAndDelete(args.id).exec()
      .then(article => article.remove())
      .then(deletedArticle => deletedArticle)
      .catch(err => console.log(err));
  }
};
