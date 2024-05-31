const mongoose = require('mongoose')
const { Schema, model } = mongoose

const seguimientoCapSchema = new Schema({
  manga: { type: Schema.Types.ObjectId, ref: 'Mangas' },
  capitulo: { type: Schema.Types.ObjectId, ref: 'Capitulos' },
  seguimiento: { type: String, required: true, default: 'No seguido', enum: ['Seguido', 'No seguido'] },
  timestamp: { type: Date }
})

const seguimientoMangaSchema = new Schema({
  manga: { type: Schema.Types.ObjectId, ref: 'Mangas' },
  seguimiento: { type: String, required: true, default: 'No siguiendo', enum: ['Siguiendo', 'Pendiente', 'Abandonado', 'Completado', 'Favorito', 'No siguiendo'] },
  capitulosVistos: [seguimientoCapSchema],
  timestamp: { type: Date }
})

const usuarioSchema = new Schema({
  nombre: { type: String, require: true },
  nombreUsuario: { type: String, require: true, unique: true },
  contrasena: { type: String, require: true },
  timestamp: { type: Date },
  login: { type: Schema.Types.ObjectId, ref: 'Login' },
  mangas: [{ type: Schema.Types.ObjectId, ref: 'Mangas' }],
  nivel: { type: String, enum: ['bajo', 'medio', 'alto'], default: 'bajo' },
  seguimientoManga: [seguimientoMangaSchema]
})

usuarioSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.contrasena
  }
})

const Usuario = model('Usuario', usuarioSchema)

module.exports = Usuario
