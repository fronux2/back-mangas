const tipoRouter = require('express').Router()
const Tipo = require('./tipoModel')

tipoRouter.get('/', (req, res, next) => {
  res.send('Hola mundo Tipo')
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
