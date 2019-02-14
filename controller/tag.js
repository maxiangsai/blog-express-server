const Tag = require('../models/tag');

const get = (req, res, next) => {
  Tag.list().then(list => {
    res.json({
      code: 200,
      data: list
    })
  }).catch(e => next(e));
}

const create = (req, res, next) => {
  Tag.create(req.body)
    .then(t => {
      const tag = new Tag(req.body);
      tag.save()
        .then(savedTag => {
          res.json({
            code: 200,
            data: savedTag
          });
        })
        .catch(e => next(e));
    })
    .catch(e => next(e));
}

const update = (req, res, next) => {
  const body = req.body
  Tag.findByIdAndUpdate(body.id, body, { new: true })
    .exec()
    .then(tag => res.json({ code: 200, data: tag }))
    .catch(e => next(e));
}

const remove = (req, res, next) => {
  const body = req.body
  Tag.findByIdAndRemove(body.id)
    .exec()
    .then(tag => {
      res.json({
        code: 200,
        data: tag
      })
    }).catch(e => next(e))
}
module.exports = {
  get,
  create,
  update,
  remove
}
