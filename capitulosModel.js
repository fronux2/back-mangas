const mongoose = require('mongoose')
const { Schema, model } = mongoose

const capitulosSchema = new Schema({
  nombre: { type: Schema.Types.ObjectId, ref: 'Mangas' },
  numero: { type: Number, required: true },
  imagenes: [{ type: String }], // Rutas de las imágenes de las páginas del capítulo
  siguiendo: { type: Boolean, default: false }
})

capitulosSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Capitulos = model('Capitulos', capitulosSchema)

module.exports = Capitulos
