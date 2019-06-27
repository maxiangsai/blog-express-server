const bcrypt = require('bcrypt')
module.exports = (inputPwd, userPwd) => {
  return bcrypt.compare(inputPwd, userPwd).then(isMatch => {
    if (isMatch) {
      return Promise.resolve()
    }
    return Promise.reject(err)
  })
}
