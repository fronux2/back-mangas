const generoRouter = require('express').Router()
const authenticateToken = require('../middleware/middlewareLogin')
const Genero = require('../models/generoModel')

generoRouter.get('/', async (req, res, next) => {
  const generos = await Genero.find({})
  res.status(200).json(generos)
})

generoRouter.post('/', authenticateToken, async (req, res, next) => {
  try {
    const { nombre } = req.body
    const infoNuevoGenero = new Genero({
      nombre
    })
    const nuevoGenero = await infoNuevoGenero.save()
    res.status(200).json(nuevoGenero)
  } catch (error) {
    console.error(error)
  }
})

generoRouter.delete('/:id', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params
    const genero = await Genero.findByIdAndDelete(id)
    res.status(200).json(genero)
  } catch (error) {
    console.error(error)
  }
})

module.exports = generoRouter
