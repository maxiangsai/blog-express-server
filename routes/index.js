'use strict';
var express = require('express');
var router = express.Router();

const usersRouter = require('./users');

router.route('/')
  .get(function() {
    res.send('index Express');
  });

router.use('/users', usersRouter)
module.exports = router;
