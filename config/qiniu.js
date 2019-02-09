const qiniu = require('qiniu')
const { env } = process
// 创建上传凭证
const accessKey = env.QINIU_AK
const secretKey = env.QINIU_SK
const EXPIRES = 9000 // 1小时
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

const options = {
  scope: 'blog',
  expires: EXPIRES
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)
module.exports = {
  uploadToken
}
