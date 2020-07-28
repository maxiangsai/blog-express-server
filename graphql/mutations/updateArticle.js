const { GraphQLString } = require('graphql');
const ArticleGraphQLType = require('../types/articleType');
const Article = require('../../models/article');

module.exports = {
  type: ArticleGraphQLType,
  args: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    summary: { type: GraphQLString },
    cover: { type: GraphQLString },
  },
  resolve(parent, args) {
    return Article.findById(args.id)
      .then(article => {
        article.title = args.title;
        article.content = args.content;
        article.summary = args.summary;
        article.cover = args.cover;
        return article.save();
      })
      .then(updatedArticle => updatedArticle)
      .catch(err => console.log(err))
  }
}
