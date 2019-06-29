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
        if (tag) {
          throw new Error('该标签已存在')
        }
        return tag
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
  }
}
module.exports = mongoose.model('Tag', TagSchema)
