const demografiaRouter = require('express').Router()
const Demografia = require('../demografiaModel')

demografiaRouter.get('/', async (req, res, next) => {
  const demografias = await Demografia.find({})
  res.status(200).json(demografias)
})

demografiaRouter.post('/', async (req, res, next) => {
  try {
    const { nombre } = req.body

    const infoNuevaDemografia = new Demografia({
      nombre
    })
    const nuevaDemografia = await infoNuevaDemografia.save()
    res.status(200).json(nuevaDemografia)
  } catch (error) {
    console.error(error)
  }
})

module.exports = demografiaRouter
