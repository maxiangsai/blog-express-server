const express = require('express');
const router = express.Router();

const articleCtrl = require('../controller/article');

router
  .get('/:keyword', articleCtrl.list)


module.exports = router;
