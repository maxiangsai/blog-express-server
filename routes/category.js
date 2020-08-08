const express = require('express');
const router = express.Router();

const categoryCtrl = require('../controller/category');
const tokenVerify = require('../middleware/verifyToken');

const validate = require('express-validation');
const paramValid = require('../utils/param-validation');

router.route('/')
  .get(categoryCtrl.get)
  .post(validate(paramValid.createCategory), tokenVerify, categoryCtrl.create)
  .put(validate(paramValid.updateCategory), tokenVerify, categoryCtrl.update)
  .delete(validate(paramValid.deleteCategory), tokenVerify, categoryCtrl.remove)

// 获取每个标签下的文章列表
router.route('/:id')
  .get(categoryCtrl.getName, categoryCtrl.getListByCategory)
module.exports = router;
