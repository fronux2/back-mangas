const capitulosRouter = require('express').Router()
const Capitulos = require('../capitulosModel')
const Mangas = require('../mangasModel')
// const middlewareLogin = require('./middlewareLogin')
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
    const { imagenes, mangas, numero, titulo, nCapitulo } = body

    const nuevoCapitulo = new Capitulos({
      titulo,
      imagenes,
      mangas,
      numero,
      nCapitulo
    })
    const savedCapitulo = await nuevoCapitulo.save()
    const manga = await Mangas.findById(mangas)
    manga.capitulos = manga.capitulos.concat(savedCapitulo._id)
    await manga.save()

    res.json(savedCapitulo)
  } catch (error) {
    next(error)
  }
})

module.exports = capitulosRouter
