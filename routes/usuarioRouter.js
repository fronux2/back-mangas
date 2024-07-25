const usuarioRouter = require('express').Router()
const Usuario = require('../models/usuariosModel')
const bcrypt = require('bcrypt')
const authenticateToken = require('../middleware/middlewareLogin')
usuarioRouter.get('/', async (req, res, next) => {
  const usuarios = await Usuario.find({}).populate('mangas', {
    titulo: 1,
    estado: 1,
    id: 1,
    capitulos: 1
  }).populate('grupos')
  res.status(200).json(usuarios)
})
usuarioRouter.get('/userId', authenticateToken, async (req, res, next) => {
  const usuarios = await Usuario.findById(req.user.usuario.id).populate('mangas', {
    titulo: 1,
    estado: 1,
    id: 1,
    capitulos: 1
  }).populate('grupos')
  res.status(200).json(usuarios)
})

usuarioRouter.post('/', async (req, res, next) => {
  const saltRounds = 10
  const { nombre, nombreUsuario, contrasena } = req.body
  const pass = await bcrypt.hash(contrasena, saltRounds)
  const nuevoUsuario = new Usuario({
    nombre,
    nombreUsuario,
    contrasena: pass
  })

  try {
    const usuario = await nuevoUsuario.save()
    res.status(200).json(usuario)
  } catch (error) {
    next(error)
  }
})

usuarioRouter.get('/manga/:mangaId', authenticateToken, async (req, res) => {
  const { user } = req
  const { mangaId } = req.params
  const usuario = await Usuario.findById(user.usuario.id)
  const mangaEncontrado = usuario.seguimientoManga.find(man => man.manga.toString() === mangaId)
  res.status(200).json(mangaEncontrado)
})

usuarioRouter.get('/perfil', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user.usuario.id
    const usuario = await Usuario.findById(userId).populate('grupos').populate({ path: 'seguimientoManga', populate: { path: 'manga' } })
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    res.status(200).json(usuario)
  } catch (error) {

  }
})

usuarioRouter.put('/calificacion/:mangaId', authenticateToken, async (req, res) => {
  const userId = req.user.usuario.id
  const { mangaId } = req.params
  const { calificacion } = req.body
  const usuario = await Usuario.findOneAndUpdate(
    { _id: userId, 'seguimientoManga.manga': mangaId },
    { $set: { 'seguimientoManga.$.calificacion': calificacion } },
    { new: true }
  )
  if (!usuario) {
    return res.status(404).send('Usuario o Manga no encontrado')
  }
  res.send(usuario)
})

usuarioRouter.get('/calificacion/:mangaId', authenticateToken, async (req, res) => {
  const { user } = req
  const { mangaId } = req.params
  const usuario = await Usuario.findOne(
    { _id: user.usuario.id, 'seguimientoManga.manga': mangaId },
    { 'seguimientoManga.$': 1 }
  )
  if (!usuario) {
    return res.status(404).send('Usuario o Manga no encontrado')
  }
  console.log(usuario.seguimientoManga)
  const manga = usuario.seguimientoManga[0]
  res.send({ calificacion: manga.calificacion })
})

usuarioRouter.post('/calificacion/:capituloId', authenticateToken, async (req, res) => {
  const { user } = req
  const { capituloId } = req.params
  const usuario = await Usuario.findById(user.usuario.id)
  const mangaEncontrado = usuario.seguimientoManga.find(man => man.manga.toString() === capituloId)
  if (!mangaEncontrado) {
    return res.status(404).json({ message: 'Manga no encontrada' })
  }
  const capituloEncontrado = mangaEncontrado.capitulosVistos.find(cap => cap.capitulo.toString() === capituloId)
  if (!capituloEncontrado) {
    return res.status(404).json({ message: 'Capitulo no encontrado' })
  }
})

module.exports = usuarioRouter
