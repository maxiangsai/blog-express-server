module.exports = (state) => {
  return (req, res, next) => {
    switch (state) {
      case 'draft':
        res.locals.state = 0
        next()
        break;

      case 'index':
        res.locals.state = 1
        next()
        break;

      default:
        res.locals.state = 1
        next()
        break;
    }
  }
}
