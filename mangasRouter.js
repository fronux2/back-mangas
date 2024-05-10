const mangasRouter = require('express').Router()
const Mangas = require('./mangasModel')
const jwt = require('jsonwebtoken')
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
  console.log(decodeToken)
  const nuevoManga = new Mangas({
    titulo,
    estado
  })
  try {
    const mangaGuardado = await nuevoManga.save()

    res.status(200).json(mangaGuardado)
  } catch (error) {
    res.status(400).json({ estado: 'estado incorrecto' })
  }
})

module.exports = mangasRouter
