const { GraphQLObjectType, GraphQLString } = require('graphql');

const TagType = new GraphQLObjectType({
  name: 'Tag',
  fields: () => ({
    name: { type: GraphQLString }
  })
});

module.exports = TagType;
