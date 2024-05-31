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
  })
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

usuarioRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const usuario = await Usuario.findById(id)
  if (!usuario) {
    return res.status(404).json({ message: 'Usuario no encontrado' })
  }
  res.status(200).json(usuario)
})

module.exports = usuarioRouter
