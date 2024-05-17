const generoRouter = require('express').Router()
const Genero = require('./generoModel')

generoRouter.get('/', (req, res, next) => {
  res.send('Hola mundo Genero')
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
