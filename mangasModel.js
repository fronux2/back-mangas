const mongoose = require('mongoose')
const { Schema, model } = mongoose

const mangasSchema = new Schema({
  titulo: { type: String, required: true },
  estado: { type: String, enum: ['Leido', 'Pendiente', 'Siguiendo', 'Favorito', 'Lo tengo', 'Abandonado'] }
})

const Mangas = model('Mangas', mangasSchema)

module.exports = Mangas
