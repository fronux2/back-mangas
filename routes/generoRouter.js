const generoRouter = require('express').Router()
const Genero = require('../models/generoModel')

generoRouter.get('/', async (req, res, next) => {
  const generos = await Genero.find({})
  res.status(200).json(generos)
})

generoRouter.post('/', async (req, res, next) => {
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

module.exports = generoRouter
