module.exports = (flag) => {
  return (req, res, next) => {
    switch (flag) {
      case 'draft':
        res.locals.flag = 0
        next()
        break;

      case 'index':
        res.locals.flag = 1
        next()
        break;

      default:
        res.locals.flag = 1
        next()
        break;
    }
  }
}
