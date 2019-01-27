'use strict';
require('env2')('./.env')
const config = require('./config')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const routes = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ')
  // const error = {
  //   status: err.status,
  //   errorMsg: unifiedErrorMessage
  // }
  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen({
  host: config.host,
  port: config.port
}, () => {
  console.log(`Server running at ${config.host}:${config.port}`);
});

module.exports = app;
