const usuarioRouter = require('express').Router()
const Usuario = require('./usuariosModel')
const bcrypt = require('bcrypt')

usuarioRouter.get('/', (req, res) => {
  res.status(200).send('Hola mundo')
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
