const mangasRouter = require('express').Router()
const Mangas = require('../models/mangasModel')
// const middlewareLogin = require('./middlewareLogin')
const Usuario = require('../models/usuariosModel')
const Genero = require('../models/generoModel')
const Tipo = require('../models/tipoModel')

mangasRouter.get('/', async (req, res) => {
  const mangas = await Mangas.find({}).populate('usuario').populate('capitulos').populate('genero').populate('tipo').populate('demografia')
  if (!mangas) return res.status(404).json({ message: 'No hay mangas' })
  res.status(200).json(mangas)
})

mangasRouter.post('/', async (req, res, next) => {
  try {
    const { userId, body } = req

    const { titulo, portada, genero, tipo, seguimiento, demografia, descripcion } = body
    const user = await Usuario.findById(userId)
    const nuevoManga = new Mangas({
      titulo,
      descripcion,
      portada,
      usuario: userId,
      genero,
      tipo,
      seguimiento,
      demografia,
      timestamp: Date.now()
    })
    const mangaGuardado = await nuevoManga.save()
    res.status(200).json(mangaGuardado)
    user.mangas = user.mangas.concat(mangaGuardado._id)
    const busquedaGenero = await Genero.findById(genero)
    const busquedaTipo = await Tipo.findById(tipo)
    busquedaGenero.manga = await busquedaGenero.manga.concat(mangaGuardado._id)
    busquedaTipo.manga = await busquedaTipo.manga.concat(mangaGuardado._id)

    await user.save()
    await busquedaGenero.save()
    await busquedaTipo.save()
  } catch (error) {
    next(error)
  }
})

mangasRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const manga = await Mangas.findById(id)
  if (!manga) return res.status(404).json({ message: 'No existe el manga' })
  res.status(200).json(manga)
})

mangasRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params
  const { body } = req
  const { seguimiento } = body
  const manga = await Mangas.findByIdAndUpdate(id, { seguimiento }, { new: true })
  if (!manga) return res.status(404).json({ message: 'No existe el manga' })
  res.status(200).json(manga)
})

module.exports = mangasRouter
