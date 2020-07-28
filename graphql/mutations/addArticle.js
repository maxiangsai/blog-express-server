const { GraphQLString } = require('graphql');
const ArticleGraphQLType = require('../types/articleType');
const Article = require('../../models/article');

module.exports = {
  type: ArticleGraphQLType,
  args: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    summary: { type: GraphQLString },
    cover: { type: GraphQLString },
  },
  resolve(parent, args) {
    const { title, content, summary, cover } = args;
    const article = new Article({
      title,
      content,
      summary,
      cover
    });
    return article.save();
  }
}
