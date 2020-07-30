const { GraphQLString } = require('graphql');
const TagGraphQLType = require('../types/tagType');
const Tag = require('../../models/tag');

module.exports = {
  type: TagGraphQLType,
  args: {
    name: { type: GraphQLString }
  },
  resolve(parent, args) {
    const { name } = args;
    const article = new Tag({
      name
    });
    return article.save();
  }
};
