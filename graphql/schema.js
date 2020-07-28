const { GraphQLSchema } = require('graphql');

const Mutation = require('./mutation');
const RootQuery = require('./queries/rootQuery');

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
