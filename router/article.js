const express = require('express');
const articleCtrl = require('../controller/article');

const router = express.Router();

router.get('/', articleCtrl.getList);

router.post('/', articleCtrl.create);

router.get('/:id', articleCtrl.getArticle);
// 修改文章
router.put('/:id', articleCtrl.update);
// 删除文章
router.delete('/:id', articleCtrl.remove);
router.param('id', articleCtrl.load);
module.exports = router;
