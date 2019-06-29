const Boom = require('boom')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema(
  {
    name: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

TagSchema.statics = {
  create(body) {
    return this.findOne(body)
      .exec()
      .then(tag => {
        return tag
      })
      .catch(e => {
        return Boom.badRequest(e)
      })
  },

  list() {
    return this.find()
      .sort({
        updateAt: -1
      })
      .exec()
      .then(tag => {
        return tag
      })
      .catch(e => {
        throw Boom.badGateway(e)
      })
  }
}
module.exports = mongoose.model('Tag', TagSchema)
