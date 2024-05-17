const { Schema, model } = require('mongoose')

const tipoSchema = new Schema({
  nombre: { type: String, unique: true },
  manga: [{ type: Schema.Types.ObjectId }]
})

tipoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Tipo = model('Tipo', tipoSchema)

module.exports = Tipo
