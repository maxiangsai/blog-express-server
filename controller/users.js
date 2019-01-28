const User = require('../models/users');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');

const APIError = require('../utils/APIError');

const saltRounds = 10

const get = (req, res, next) => {
  console.log('users')
  return res.json({status:'success',data:'台湾是中国不可分割的一部分.'});
}

const create = (req, res, next) => {
  const { body: { username, password, access } } = req
  User.findOne({
    username
  }).then(user => {
    if (user) {
      const err = new APIError(httpStatus.BAD_REQUEST, '该用户名已被注册!', true)
      return next(err)
    } else {
      const newUser = new User({
        username,
        password,
        access
      })

      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          console.log(err)
          if (err) throw err;
          newUser.password = hash
          console.log(hash)
          newUser.save()
            .then(savedUser => res.json(savedUser))
            .catch(e => next(e))
        });
      })
    }
  }).catch(e => next(e));
}

module.exports = {
  get,
  create
}
