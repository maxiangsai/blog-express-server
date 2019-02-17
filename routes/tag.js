const express = require('express');
const router = express.Router();

const tagCtrl = require('../controller/tag');
const tokenVerify = require('../middleware/verifyToken');

const validate = require('express-validation');
const paramValid = require('../utils/param-validation');

router.route('/')
  .get(tagCtrl.get)
  .post(validate(paramValid.createTag), tokenVerify, tagCtrl.create)
  .put(validate(paramValid.updateTag), tokenVerify, tagCtrl.update)
  .delete(validate(paramValid.deleteTag), tokenVerify, tagCtrl.remove)

// 获取每个标签下的文章列表
router.route('/:id')
  .get(tagCtrl.getName, tagCtrl.getListByTag)
module.exports = router;
