exports.initDB = () => {
  const mongoose = require('mongoose');
  main().catch(err => {
    console.log('MongoDB 连接数据库失败', err);
  });

  async function main() {
    await mongoose.connect(process.env.DB_URI);
    console.log('MongoDB 连接数据库成功');
  }
};

exports.User = require('./user');
exports.Article = require('./article');
