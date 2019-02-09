const express = require('express')
const router = express.Router()
const qiniuConfig = require('../config/qiniu')
const tokenVerify = require('../middleware/verifyToken')
// /v1/upload
router.get('/token', tokenVerify, (req, res, next) => {
  res.json({
    token: qiniuConfig.uploadToken
  })
})

module.exports = router
