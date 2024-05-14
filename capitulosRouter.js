const capitulosRouter = require('express').Router()
const Capitulos = require('./capitulosModel')
const Mangas = require('./mangasModel')
const middlewareLogin = require('./middlewareLogin')
capitulosRouter.get('/', async (req, res) => {
  const capitulos = await Capitulos.find({}).populate('mangas')
  res.json(capitulos)
})

capitulosRouter.post('/', middlewareLogin, async (req, res, next) => {
  try {
    const { body } = req
    const { numero, imagenes, siguiendo, mangas } = body

    const nuevoCapitulo = new Capitulos({
      numero,
      imagenes,
      siguiendo,
      mangas
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
