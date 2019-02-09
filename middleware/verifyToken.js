const verify = require('../utils/token');
// 验证token获取userId
const tokenVerify = (req, res, next) => {
  const t = req.body.token || req.query.token || req.get('Authorization').split(' ')[1];
  const decoded = verify(t);
  req.userId = decoded.userId;
  req.username = decoded.userId;
  next();
}

module.exports = tokenVerify
