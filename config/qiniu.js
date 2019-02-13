const qiniu = require('qiniu')
const { env } = process
// 创建上传凭证
const accessKey = env.QINIU_AK
const secretKey = env.QINIU_SK
const bucket = 'blog'
const EXPIRES = 9000 // 1小时
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

// 构建上传策略
function uptoken (key) {
  const options = {
    scope: `${bucket}:${key}`,
    expires: EXPIRES
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  return putPolicy.uploadToken(mac)
}

module.exports = {
  uptoken
}
