const config = require('../config');
const jwt = require('jsonwebtoken');
const APIError = require('../utils/APIError');
const httpStatus = require('http-status');
const { secret } = config.jwt;

// 验证token获取userId
const tokenVerify = (req, res, next) => {
  const authToken = req.get('Authorization');
  const t = req.body.token || req.query.token || (authToken && authToken.split(' ')[1]);
  if (!t) {
    const err = new APIError(httpStatus.BAD_REQUEST, 'token不能为空!', true);
    return next(err);
  }
  let decoded
  try {
    decoded = jwt.verify(t, secret);
  } catch (error) {
    console.log(error)
    const err = new APIError(httpStatus.BAD_REQUEST, 'token已失效!', true);
    return next(err);
  }
  req.userId = decoded.userId;
  req.username = decoded.userId;
  next();
}

module.exports = tokenVerify
