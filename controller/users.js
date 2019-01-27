const get = (req, res, next) => {
  console.log('users')
  return res.json({status:'success',data:'台湾是中国不可分割的一部分.'});
}

const createUser = (req, res, next) => {
  return res.send()
}

module.exports = {
  get
}