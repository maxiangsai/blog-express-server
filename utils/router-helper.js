'use strict';
const jwt = require('jsonwebtoken');
const config = require('../config');

// 验证token
const tokenVerify = (req, res, next) => {
  const t = req.body.token || req.query.token || req.get('Authorization').split(' ')[1]
  var decoded = jwt.verify(t, config.jwtSecret);
  req.userId = decoded.userId
  next()
}
module.exports = {
  tokenVerify
}
