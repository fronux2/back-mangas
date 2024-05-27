const usuarioRouter = require('express').Router()
const Usuario = require('../models/usuariosModel')
const bcrypt = require('bcrypt')
const authenticateToken = require('./middlewareLogin')

usuarioRouter.get('/', authenticateToken, async (req, res, next) => {
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

module.exports = usuarioRouter
