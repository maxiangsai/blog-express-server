const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql');
const tagType = require('./tagType');
const Tag = require('../../models/tag');

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    summary: { type: GraphQLString },
    cover: { type: GraphQLString },
    tags: {
      type: new GraphQLList(tagType),
      resolve(parent, args) {
        console.log(parent.tags[0]);
        return Tag.find({_id: parent.tags[0]});
      }
    },
    state: { type: GraphQLInt }
  })
});

module.exports = ArticleType;
