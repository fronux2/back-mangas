const mongoose = require('mongoose')
const { Schema, model } = mongoose

const capitulosSchema = new Schema({
  titulo: { type: String },
  numero: { type: Number },
  nCapitulo: { type: Number, required: true, unique: true },
  imagenes: [{ type: String }], // Rutas de las imágenes de las páginas del capítulo
  siguiendo: { type: Boolean, default: false },
  mangas: { type: Schema.Types.ObjectId, ref: 'Mangas' }
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
