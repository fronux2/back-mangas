const usuarioRouter = require('express').Router()
const Usuario = require('./usuariosModel')
const bcrypt = require('bcrypt')

usuarioRouter.get('/', async (req, res) => {
  const usuarios = await Usuario.find({}).populate('mangas', {
    titulo: 1,
    estado: 1,
    id: 1
  }).populate('capitulos', {
    numero: 1,
    imagenes: 1,
    siguiendo: 1,
    id: 1
  })
  res.status(200).json(usuarios)
})

usuarioRouter.post('/', async (req, res) => {
  const saltRounds = 10
  const { nombre, nombreUsuario, contrasena } = req.body
  const pass = await bcrypt.hash(contrasena, saltRounds)
  const nuevoUsuario = new Usuario({
    nombre,
    nombreUsuario,
    contrasena: pass
  })

  const usuario = await nuevoUsuario.save()
  res.status(200).json(usuario)
})

module.exports = usuarioRouter
