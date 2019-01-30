'use strict';
const express = require('express');
const router = express.Router();

const usersRouter = require('./users');

router.route('/')
  .get(function(req, res) {
    res.send('index Express');
  });

router.use('/users', usersRouter)
module.exports = router;
