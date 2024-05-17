const mangasRouter = require('express').Router()
const Mangas = require('./mangasModel')
const middlewareLogin = require('./middlewareLogin')
const Usuario = require('./usuariosModel')
const Genero = require('./generoModel')
const Tipo = require('./tipoModel')
const Estado = require('./estadoModel')
mangasRouter.get('/', async (req, res) => {
  const mangas = await Mangas.find({}).populate('usuario').populate('capitulos')
  res.status(200).json(mangas)
})

mangasRouter.post('/', middlewareLogin, async (req, res, next) => {
  try {
    const { userId, body } = req
    const { titulo, estado, genero, tipo } = body
    const user = await Usuario.findById(userId)
    const nuevoManga = new Mangas({
      titulo,
      estado,
      usuario: userId,
      genero,
      tipo,
      timestamp: Date.now()
    })

    const mangaGuardado = await nuevoManga.save()
    user.mangas = user.mangas.concat(mangaGuardado._id)
    const busquedaGenero = await Genero.findById(genero)
    const busquedaTipo = await Tipo.findById(tipo)
    const busquedaEstado = await Estado.findById(estado)
    busquedaGenero.manga = await busquedaGenero.manga.concat(mangaGuardado._id)
    busquedaTipo.manga = await busquedaTipo.manga.concat(mangaGuardado._id)
    busquedaEstado.manga = await busquedaEstado.manga.concat(mangaGuardado._id)

    await user.save()
    await busquedaGenero.save()
    await busquedaTipo.save()
    await busquedaEstado.save()
    res.status(200).json(mangaGuardado)
  } catch (error) {
    next(error)
  }
})

module.exports = mangasRouter
