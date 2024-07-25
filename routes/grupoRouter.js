const grupoRouter = require('express').Router()
const Grupo = require('../models/grupoModel')
const Mangas = require('../models/mangasModel')
const Usuario = require('../models/usuariosModel')
const authenticateToken = require('../middleware/middlewareLogin')
grupoRouter.get('/', async (req, res) => {
  try {
    const grupos = await Grupo.find({}).populate({
      path: 'mangas',
      populate: [{ path: 'genero' }, { path: 'tipo' }, { path: 'demografia' }]
    })
    res.json(grupos)
  } catch (error) {

  }
})

grupoRouter.get('/:idGrupo', async (req, res) => {
  try {
    const { idGrupo } = req.params
    const grupo = await Grupo.findById(idGrupo).populate({
      path: 'mangas',
      populate: [{ path: 'genero' }, { path: 'tipo' }, { path: 'demografia' }]
    })
    console.log(grupo)
    res.json(grupo)
  } catch (error) {

  }
})
grupoRouter.get('/usuario', authenticateToken, async (req, res) => {
  const { user } = req
  const usuarioId = user.usuario.id
  const grupos = await Usuario.findById(usuarioId).select('grupos').populate('grupos')
  res.json(grupos)
})

grupoRouter.post('/', authenticateToken, async (req, res, next) => {
  try {
    const { body, user } = req
    const usuarioId = user.usuario.id
    const { nombre, tipo } = body
    const nuevoGrupo = new Grupo({
      nombre,
      timestamp: new Date(),
      miembros: { usuarios: usuarioId },
      tipo
    })
    const savedGrupo = await nuevoGrupo.save()
    res.json(savedGrupo)
    const usuarioEncontrado = await Usuario.findById(usuarioId)
    usuarioEncontrado.grupos.push(savedGrupo._id)
    await usuarioEncontrado.save()
  } catch (error) {
    next(error)
  }
})

grupoRouter.post('/mangas/:idManga', authenticateToken, async (req, res, next) => {
  const { params, body } = req
  const { idManga } = params
  const { grupo } = body
  console.log(grupo)
  try {
    const grupoEncontrado = await Grupo.findOne({ nombre: grupo })
    const mangaEncontrado = await Mangas.findById(idManga)
    if (mangaEncontrado.grupos.includes(grupoEncontrado._id)) {
      return res.status(400).json({ message: 'Ya esta en el grupo' })
    }
    console.log(mangaEncontrado)
    mangaEncontrado.grupos.push(grupoEncontrado._id)
    mangaEncontrado.save()
    grupoEncontrado.mangas.push(idManga)
    const mangaEnGrupo = grupoEncontrado.save()
    res.json(mangaEnGrupo)
  } catch (error) {
    next(error)
  }
})

grupoRouter.get('')

module.exports = grupoRouter
