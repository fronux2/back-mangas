const mangasRouter = require('express').Router()
const Mangas = require('./mangasModel')
const jwt = require('jsonwebtoken')
const Usuario = require('./usuariosModel')

mangasRouter.get('/', async (req, res) => {
  const mangas = await Mangas.find({})
  res.status(200).json(mangas)
})

mangasRouter.post('/', async (req, res) => {
  const Authorization = req.get('Authorization')

  if (!Authorization && !Authorization.startsWith('Bearer')) {
    return res.json('error:autenticacion erronea')
  }
  const token = Authorization.substring(7)
  const decodeToken = jwt.verify(token, process.env.SECRET)
  const { titulo, estado } = req.body
  const { usuario } = decodeToken
  const user = await Usuario.findById(usuario.id)
  const nuevoManga = new Mangas({
    titulo,
    estado,
    usuario: usuario.id
  })
  try {
    const mangaGuardado = await nuevoManga.save()
    user.mangas = user.mangas.concat(mangaGuardado._id)
    await user.save()
    res.status(200).json(mangaGuardado)
  } catch (error) {
    res.status(400).json({ estado: 'estado incorrecto' })
  }
})

module.exports = mangasRouter
