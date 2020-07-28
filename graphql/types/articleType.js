const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    summary: { type: GraphQLString },
    cover: { type: GraphQLString },
  })
});

module.exports = ArticleType;
