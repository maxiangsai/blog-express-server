const express = require('express');
const router = express.Router();

const tagCtrl = require('../controller/tag');
const tokenVerify = require('../middleware/verifyToken');

const validate = require('express-validation');
const paramValid = require('../utils/param-validation');

router.route('/')
  .get(tokenVerify, tagCtrl.get)
  .post(validate(paramValid.createTag), tokenVerify, tagCtrl.create)

module.exports = router;
