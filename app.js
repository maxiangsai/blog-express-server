'use strict';
require('dotenv').config({ path: './.env' });
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// const APIError = require('./utils/APIError')
const router = require('./router');
const errorHandle = require('./middleware/error-handle');
const { initDB } = require('./model');

const app = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(cors());

app.use('/api', router);

// 统一处理服务端错误
app.use(errorHandle());

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   const err = new APIError(httpStatus.NOT_FOUND, '资源不存在')
//   return next(err)
// });

// Connect to mongodb
initDB();
app.listen(process.env.port, () => {
  console.log(`Server running at ${process.env.PORT}`);
});

module.exports = app;
