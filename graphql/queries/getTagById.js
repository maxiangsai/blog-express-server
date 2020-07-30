const { GraphQLID } = require('graphql');
const TagGraphQLType = require('../types/tagType');
const Tag = require('../../models/tag');

module.exports = {
  type: TagGraphQLType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return Tag.findById(args.id);
  }
};

