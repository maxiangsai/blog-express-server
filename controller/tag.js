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

const create = (req, res, next) => {
  Tag.create(req.body)
    .then(t => {
      const tag = new Tag(req.body);
      tag.save()
        .then(savedTag => {
          res.json({ data: savedTag });
        })
        .catch(e => next(e));
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
  create,
  update
}
