const loginRouter = require('express').Router()
const Usuario = require('../models/usuariosModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.get('/', (req, res) => {
  res.send('Login')
})

loginRouter.post('/', async (req, res, next) => {
  console.log(req.body)
  const { nombreUsuario, contrasena } = req.body
  try {
    const usuario = await Usuario.findOne({ nombreUsuario })
    const validadorContrasena = await bcrypt.compare(contrasena, usuario.contrasena)
    if (usuario && validadorContrasena) {
      const token = await jwt.sign({ usuario }, process.env.SECRET, { expiresIn: '1h' })
      console.log('token: ', token)
      res.cookie('token', token, { httpOnly: true, secure: false, path: '/' })
      res.status(200).json({ menubar: 'Login correcto' })
    } else {
      res.status(400).json({ error: 'Usuario o contraseña incorrecto' })
    }
  } catch (error) {
    next(error)
  }
})

loginRouter.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logout correcto' })
})

module.exports = loginRouter
