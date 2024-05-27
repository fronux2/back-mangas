const { Schema, model } = require('mongoose')

const demografiaSchema = new Schema({
  nombre: { type: String, unique: true },
  manga: [{ type: Schema.Types.ObjectId, ref: 'Mangas' }]
})
demografiaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Demografia = model('Demografia', demografiaSchema)

module.exports = Demografia
