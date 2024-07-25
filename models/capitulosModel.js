const mongoose = require('mongoose')
const { Schema, model } = mongoose

const grupoImagenesSchema = new Schema({
  grupo: { type: Schema.Types.ObjectId, ref: 'Grupo', required: true },
  imagenes: [{ type: String }], // Rutas de las imágenes de las páginas del capítulo
  numero: { type: Number } // Numero de la página del capítulo
})

const capitulosSchema = new Schema({
  titulo: { type: String },
  nCapitulo: { type: Number, required: true },
  grupoImagenes: [grupoImagenesSchema], // Rutas de las imágenes de las páginas del capítulo
  siguiendo: { type: Boolean, default: false },
  mangas: { type: Schema.Types.ObjectId, ref: 'Mangas' },
  timestamp: { type: Date, default: Date.now },
  vistas: { type: Number, default: 0 },
  calificacion: { type: Number, required: true, default: 0 }

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
