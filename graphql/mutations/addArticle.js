const { GraphQLString, GraphQLList } = require('graphql');
const ArticleGraphQLType = require('../types/articleType');
const TagGraphQLType = require('../types/tagType');
const Article = require('../../models/article');

module.exports = {
  type: ArticleGraphQLType,
  args: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    summary: { type: GraphQLString },
    cover: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) }
  },
  resolve(parent, args) {
    const { title, content, summary, cover, tags } = args;
    const article = new Article({
      title,
      content,
      summary,
      cover,
      tags
    });
    return article.save();
  }
};
