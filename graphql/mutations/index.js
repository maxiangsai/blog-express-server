const { GraphQLObjectType } = require('graphql');

const addArticle = require('./addArticle');
const updateArticle = require('./updateArticle');
const removeArticle = require('./removeArticle');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addArticle,
    updateArticle,
    removeArticle
  }
});

module.exports = Mutation;
