const loginRouter = require('express').Router()
const Usuario = require('./usuariosModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.get('/', (req, res) => {
  res.send('Login')
})

loginRouter.post('/', async (req, res) => {
  const { nombreUsuario, contrasena } = req.body
  const usuario = await Usuario.findOne({ nombreUsuario })
  const validadorContrasena = await bcrypt.compare(contrasena, usuario.contrasena)
  if (usuario && validadorContrasena) {
    const token = await jwt.sign({ usuario }, process.env.SECRET, { expiresIn: '1h' })

    res.status(200).json({ usuario, token })
  } else {
    res.status(400).json({ error: 'Usuario o contraseña incorrecto' })
  }
})

module.exports = loginRouter
