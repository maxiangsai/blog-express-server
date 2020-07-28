const { GraphQLObjectType } = require('graphql');

const addArticle = require('./mutations/addArticle');
const updateArticle = require('./mutations/updateArticle');
const removeArticle = require('./mutations/removeArticle');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addArticle,
    updateArticle,
    removeArticle
  }
})

module.exports = Mutation;
