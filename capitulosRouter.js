const capitulosRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Capitulos = require('./capitulosModel')
const Usuario = require('./usuariosModel')

capitulosRouter.get('/', (req, res) => {
  res.send('Capitulos')
})

capitulosRouter.post('/', async (req, res) => {
  const Authorization = req.get('Authorization')

  if (!Authorization && !Authorization.startsWith('Bearer')) {
    return res.json('error:autenticacion erronea')
  }
  const token = Authorization.substring(7)
  const decodeToken = jwt.verify(token, process.env.SECRET)
  const { usuario } = decodeToken
  const { numero, imagenes, siguiendo } = req.body
  const user = await Usuario.findById(usuario.id)
  const nuevoCapitulo = new Capitulos({
    numero,
    imagenes,
    siguiendo,
    nombre: usuario.id
  })

  const savedCapitulo = await nuevoCapitulo.save()
  user.capitulos = user.capitulos.concat(savedCapitulo._id)
  await user.save()
  res.json(savedCapitulo)
})

module.exports = capitulosRouter
