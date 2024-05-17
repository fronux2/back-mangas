// 'Leido', 'Pendiente', 'Siguiendo', 'Favorito', 'Lo tengo', 'Abandonado' - ESTADOS
const { Schema, model } = require('mongoose')

const estadoSchema = new Schema({
  nombre: { type: String, unique: true },
  manga: [{ type: Schema.Types.ObjectId, ref: 'Mangas' }]
})

estadoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Estado = model('Estado', estadoSchema)

module.exports = Estado
