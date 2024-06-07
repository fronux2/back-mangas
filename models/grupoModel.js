const mongoose = require('mongoose')
const { Schema, model } = mongoose

const miembroSchema = new Schema({
  usuarios: { type: Schema.Types.ObjectId, ref: 'Usuarios' },
  nivel: { type: Number, default: 0 }
})

const grupoSchema = new Schema({
  nombre: { type: String }, // nombre del grupo
  seguidores: { type: Number, default: 0 }, // los usuarios que se encuentran en el grupo
  proyectos: { type: Number, default: 0 }, // los mangas subidos
  subidas: { type: Number, default: 0 }, // los capitulos subidos
  timestamp: { type: Date },
  miembros: [miembroSchema], // los usuarios que se encuentran en el grupo
  tipo: { type: String, enum: ['Uploader', 'Scanlation', 'Amateur'] },
  mangas: [{ type: Schema.Types.ObjectId, ref: 'Mangas' }]
})

grupoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Grupo = model('Grupo', grupoSchema)

module.exports = Grupo
