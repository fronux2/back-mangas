const registroRouter = require('express').Router()
const Usuario = require('../models/usuariosModel')
const bcrypt = require('bcrypt')
const authenticateToken = require('../middleware/middlewareLogin')

registroRouter.post('/', async (req, res, next) => {
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

registroRouter.get('/', authenticateToken, async (req, res, next) => {
  try {
    const usuarios = await Usuario.find({})
    res.status(200).json(usuarios)
  } catch (error) {
    console.error(error)
  }
})

module.exports = registroRouter
