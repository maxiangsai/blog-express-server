'use strict';
const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const APIError = require('./utils/APIError');
const config = require('./config');

const app = express();
// Connect to mongodb
Promise = require('bluebird');
mongoose.Promise = Promise;
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.connection.on('error', () => {
  throw new Error(`无法连接到数据库：${mongoUri}`);
});

// middleware
const logPath = path.join(__dirname, 'log');
fs.existsSync(logPath) || fs.mkdirSync(logPath);
const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logPath
});
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// cors origin
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
  res.header('content-type', 'application/json; charset=utf-8');
  next();
});

const routes = require('./routes/index');
app.use('/v1', routes);

// 统一用APIError处理错误，给下个中间件(error handler)处理返回
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // 入参校验（joi）错误信息（数组)
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
  const err = new APIError(httpStatus.NOT_FOUND, '资源不存在');
  return next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status).json({
    code: err.status,
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
