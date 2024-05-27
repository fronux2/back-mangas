const tipoRouter = require('express').Router()
const Tipo = require('../models/tipoModel')

tipoRouter.get('/', async (req, res, next) => {
  const tipo = await Tipo.find({})
  res.status(200).json(tipo)
})

tipoRouter.post('/', async (req, res, next) => {
  try {
    const { nombre } = req.body
    const infoNuevoTipo = new Tipo({
      nombre
    })
    const nuevoGenero = await infoNuevoTipo.save()
    res.status(200).json(nuevoGenero)
  } catch (error) {
    console.error(error)
  }
})

module.exports = tipoRouter
