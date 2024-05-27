const mongoose = require('mongoose')
const { Schema, model } = mongoose

const mangasSchema = new Schema({
  titulo: { type: String, required: true, unique: true },
  portada: { type: String, required: true },
  descripcion: { type: String, required: true },
  estado: { type: Schema.Types.ObjectId, ref: 'Estado' },
  genero: [{ type: Schema.Types.ObjectId, ref: 'Genero' }],
  tipo: { type: Schema.Types.ObjectId, required: true, ref: 'Tipo' },
  seguimiento: { type: String, required: true, default: 'No siguiendo', enum: ['Siguiendo', 'Pendiente', 'Abandonado', 'Completado', 'Favorito', 'No siguiendo'] },
  timestamp: { type: Date },
  demografia: { type: Schema.Types.ObjectId, required: true, ref: 'Demografia' },
  webcomic: { type: Boolean, required: true, default: false },
  yonkoma: { type: Boolean, required: true, default: false },
  amateur: { type: Boolean, required: true, default: false },
  Erotico: { type: Boolean, required: true, default: false },
  capitulos: [{ type: Schema.Types.ObjectId, ref: 'Capitulos' }],
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
