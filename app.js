'use strict';
require('env2')('./.env');
const config = require('./config');

const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// 引入路由
const routes = require('./routes/index');

const app = express();

// 使mongoose promise化
Promise = require('bluebird')
mongoose.Promise = Promise

// Connect to mongodb
const mongoUri = config.mongo.host
mongoose.connect(mongoUri, { useNewUrlParser: true })
mongoose.connection.on('error', () => {
  throw new Error(`无法连接到数据库：${mongoUri}`)
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1', routes);

// 统一用APIError处理错误，给下个中间件(error handler)处理返回
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // 入参校验（joi）错误信息（数组）
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(err.status, unifiedErrorMessage, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    // 非APIError 其他错误
    const apiError = new APIError(err.status, err.message, err.isPublic);
    return next(apiError);
  }
  // api出现的错误
  return next(err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new APIError(httpStatus.NOT_FOUND, '资源不存在')
  return next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status]
  });
});

app.listen({
  host: config.host,
  port: config.port
}, () => {
  console.log(`Server running at ${config.host}:${config.port}`);
});

module.exports = app;
