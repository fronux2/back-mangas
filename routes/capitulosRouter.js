const capitulosRouter = require('express').Router()
const Capitulos = require('../models/capitulosModel')
const Mangas = require('../models/mangasModel')
const authenticateToken = require('../middleware/middlewareLogin')
// const middlewareLogin = require('./middlewareLogin')

capitulosRouter.get('/trending', async (req, res) => {
  try {
    const trendingCapitulos = await Capitulos.find()
      .sort({ vistas: -1, timestamp: -1 })
      .populate({
        path: 'mangas',
        populate: [
          { path: 'genero' },
          { path: 'tipo' },
          { path: 'demografia' }
        ]
      })
      .limit(10)

    res.json(trendingCapitulos)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

capitulosRouter.get('/ultimos', async (req, res) => {
  try {
    const capitulos = await Capitulos.find({}).sort({ timestamp: -1 }).limit(10).populate({
      path: 'mangas',
      populate: [
        { path: 'genero' },
        { path: 'tipo' },
        { path: 'demografia' }
      ]
    })
    res.json(capitulos)
  } catch (error) {
    console.error(error)
  }
})
capitulosRouter.get('/', async (req, res) => {
  const capitulos = await Capitulos.find({}).populate('mangas')
  res.json(capitulos)
})

capitulosRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const capitulo = await Capitulos.findById(id)
  res.json(capitulo)
})

capitulosRouter.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const { mangas, titulo, nCapitulo } = body
    const nuevoCapitulo = new Capitulos({
      titulo,
      mangas,
      nCapitulo
    })
    const savedCapitulo = await nuevoCapitulo.save()
    const manga = await Mangas.findById(mangas)
    manga.capitulos = manga.capitulos.concat(savedCapitulo._id)
    await manga.save()
    res.json(savedCapitulo)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

capitulosRouter.post('/:idCap/imagenes', async (req, res, next) => {
  try {
    const { idCap } = req.params
    const { grupo, imagenes, numero } = req.body
    const capitulo = await Capitulos.findById(idCap)
    capitulo.grupoImagenes.push({ grupo, imagenes, numero })
    const response = await capitulo.save()
    res.json(response)
  } catch (error) {

  }
})

capitulosRouter.get('/:idCap/vistas', async (req, res, next) => {
  const { idCap } = req.params
  try {
    const capitulo = await Capitulos.findById(idCap)
    capitulo.vistas = capitulo.vistas + 1
    const response = await capitulo.save()
    res.json({ vistas: response.vistas })
  } catch (error) {

  }
})

module.exports = capitulosRouter
