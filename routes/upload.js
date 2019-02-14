const express = require('express')
const router = express.Router()
const qiniuConfig = require('../config/qiniu')
const tokenVerify = require('../middleware/verifyToken')
// /v1/upload
router.get('/token', tokenVerify, (req, res, next) => {
  const token = qiniuConfig.uptoken(req.query.key)
  res.json({
    code: 200,
    data: token
  })
})

module.exports = router
