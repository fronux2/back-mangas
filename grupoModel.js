const mongoose = require('mongoose')
const { Schema, model } = mongoose

const capitulosSchema = new Schema({
  nombre: { type: String },
  seguidores: { type: Number },
  proyectos: { type: Number },
  subidas: { type: Number },
  timestamp: { type: Date },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios' },
  tipo: { type: String, enum: ['Uploader', 'Scanlation', 'Amateur'] }

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
