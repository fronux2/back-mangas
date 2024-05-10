const mongoose = require('mongoose')
const { Schema, model } = mongoose

const mangasSchema = new Schema({
  titulo: { type: String, required: true },
  estado: { type: String, enum: ['Leido', 'Pendiente', 'Siguiendo', 'Favorito', 'Lo tengo', 'Abandonado'] },
  capitulos: { type: Schema.Types.ObjectId, ref: 'Capitulos' },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
})

mangasSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Mangas = model('Mangas', mangasSchema)

module.exports = Mangas
