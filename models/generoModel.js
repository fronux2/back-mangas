const { Schema, model } = require('mongoose')

const generoSchema = new Schema({
  nombre: { type: String, unique: true },
  manga: [{ type: Schema.Types.ObjectId, ref: 'Mangas' }]
})

generoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Genero = model('Genero', generoSchema)

module.exports = Genero
