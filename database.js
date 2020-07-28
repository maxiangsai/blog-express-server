const mongoose = require('mongoose');
const { mongoUri } = require('./config');

const initDB = () => {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true
  });

  mongoose.connection.once('open', () => {
    console.log('connection to mongoose')
  })
};

module.exports = initDB;
