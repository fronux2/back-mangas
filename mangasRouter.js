const mangasRouter = require('express').Router()
const Mangas = require('./mangasModel')
const middlewareLogin = require('./middlewareLogin')
const Usuario = require('./usuariosModel')

mangasRouter.get('/', async (req, res) => {
  const mangas = await Mangas.find({}).populate('usuario').populate('capitulos')
  res.status(200).json(mangas)
})

mangasRouter.post('/', middlewareLogin, async (req, res, next) => {
  try {
    const { userId, body } = req
    const { titulo, estado } = body
    const user = await Usuario.findById(userId)
    const nuevoManga = new Mangas({
      titulo,
      estado,
      usuario: userId
    })
    const mangaGuardado = await nuevoManga.save()
    user.mangas = user.mangas.concat(mangaGuardado._id)
    await user.save()
    res.status(200).json(mangaGuardado)
  } catch (error) {
    next(error)
  }
})

module.exports = mangasRouter
