const mongoose = require('mongoose')
const { Schema, model } = mongoose

const usuarioSchema = new Schema({
  nombre: { type: String, require: true },
  nombreUsuario: { type: String, require: true, unique: true },
  contrasena: { type: String, require: true },
  login: { type: Schema.Types.ObjectId, ref: 'Login' },
  mangas: [{ type: Schema.Types.ObjectId, ref: 'Mangas' }]
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