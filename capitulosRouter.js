const capitulosRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Capitulos = require('./capitulosModel')
const Mangas = require('./mangasModel')
capitulosRouter.get('/', (req, res) => {
  res.send('Capitulos')
})

capitulosRouter.post('/', async (req, res) => {
  const Authorization = req.get('Authorization')
  const { numero, imagenes, siguiendo, mangas } = req.body
  if (!Authorization && !Authorization.startsWith('Bearer')) {
    return res.json('error:autenticacion erronea')
  }
  const token = Authorization.substring(7)
  const decodeToken = jwt.verify(token, process.env.SECRET)
  if (!decodeToken) {
    return res.json({ error: 'error con el token' })
  }

  const nuevoCapitulo = new Capitulos({
    numero,
    imagenes,
    siguiendo,
    mangas
  })
  const savedCapitulo = await nuevoCapitulo.save()
  const manga = await Mangas.findById(mangas)
  manga.capitulos = manga.capitulos.concat(savedCapitulo._id)
  await manga.save()

  res.json(savedCapitulo)
})

module.exports = capitulosRouter
