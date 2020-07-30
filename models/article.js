const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: String,
  content: String,
  summary: String,
  cover: String,
  tags: Array
});

module.exports = mongoose.model('Article', ArticleSchema);
