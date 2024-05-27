const estadoRouter = require('express').Router()
const Estado = require('../tipoModel')

estadoRouter.get('/', (req, res, next) => {
  res.send('Hola mundo Estado')
})

estadoRouter.post('/', async (req, res, next) => {
  try {
    const { nombre } = req.body
    const infoNuevoEstado = new Estado({
      nombre
    })
    const nuevoGenero = await infoNuevoEstado.save()
    res.status(200).json(nuevoGenero)
  } catch (error) {
    console.error(error)
  }
})

module.exports = estadoRouter
