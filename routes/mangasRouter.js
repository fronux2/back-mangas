const mangasRouter = require('express').Router()
const Mangas = require('../models/mangasModel')
const authenticateToken = require('../middleware/middlewareLogin')
const Usuario = require('../models/usuariosModel')
const Genero = require('../models/generoModel')
const Grupo = require('../models/grupoModel')
const Tipo = require('../models/tipoModel')

mangasRouter.get('/ultimos', async (req, res) => {
  const mangas = await Mangas.find({}).sort({ timestamp: -1 }).limit(10).populate('genero').populate('tipo').populate('demografia')
  res.status(200).json(mangas)
})

mangasRouter.put('/:mangasId/seguimiento', authenticateToken, async (req, res) => {
  const { mangasId } = req.params
  const { body } = req
  const { aprobacion } = body
  const manga = await Mangas.findByIdAndUpdate(mangasId, { aprobacion }, { new: true })
  if (!manga) return res.status(404).json({ message: 'No existe el manga' })
  res.status(200).json(manga)
})

mangasRouter.get('/', async (req, res) => {
  const mangas = await Mangas.find({}).populate('capitulos').populate('genero').populate('tipo').populate('demografia')
  if (!mangas) return res.status(404).json({ message: 'No hay mangas' })
  res.status(200).json(mangas)
})

mangasRouter.post('/', authenticateToken, async (req, res, next) => {
  const { body, user } = req
  const userId = user.usuario.id
  const { titulo, portada, genero, tipo, demografia, descripcion } = body
  try {
    const userEncontrado = await Usuario.findById(userId)
    const nuevoManga = new Mangas({
      titulo,
      descripcion,
      portada,
      genero,
      tipo,
      demografia,
      timestamp: Date.now()
    })
    console.log(nuevoManga)
    const mangaGuardado = await nuevoManga.save()
    res.status(200).json(mangaGuardado)
    const busquedaGenero = await Genero.findById(genero)
    const busquedaTipo = await Tipo.findById(tipo)
    busquedaGenero.manga = await busquedaGenero.manga.concat(mangaGuardado._id)
    busquedaTipo.manga = await busquedaTipo.manga.concat(mangaGuardado._id)

    await userEncontrado.save()
    await busquedaGenero.save()
    await busquedaTipo.save()
  } catch (error) {
    console.error(error)
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

mangasRouter.put('/seguimiento/:id', authenticateToken, async (req, res, next) => {
  const { id } = req.params
  const { body } = req
  const { aprobacion } = body
  try {
    const manga = await Mangas.findByIdAndUpdate(id, { aprobacion }, { new: true })
    if (!manga) return res.status(404).json({ message: 'No existe el manga' })
    res.status(200).json(manga)
  } catch (error) {

  }
})

module.exports = mangasRouter
