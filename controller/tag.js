const Tag = require('../models/tag');

const get = (req, res, next) => {
  Tag.find().sort({
    'updateAt': -1
  })
  .exec()
  .then(tag => {
    res.json({ data: tag });
  })
  .catch(e => next(e));
}

const post = (req, res, next) => {
  Tag.post(req.body)
    .then(t => {
      const tag = new Tag(req.body);
      res.json({ data: tag });
    })
    .catch(e => next(e));
}

const update = (req, res, next) => {
  const body = req.body
  Tag.findByIdAndUpdate(body.id, body)
    .exec()
    .then(tag => res.json({ data: tag }))
    .catch(e => next(e));
}

module.exports = {
  get,
  post,
  update
}
