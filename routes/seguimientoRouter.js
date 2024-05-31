const seguimientoRouter = require('express').Router()
const Usuario = require('../models/usuariosModel')
const Mangas = require('../models/mangasModel')
const authenticateToken = require('../middleware/middlewareLogin')

seguimientoRouter.post('/manga/:idManga', authenticateToken, async (req, res) => {
  const { user, body, params } = req
  const { estado } = body
  const { idManga } = params
  const userId = user.usuario.id
  try {
    const user = await Usuario.findById(userId)
    const manga = await Mangas.findById(idManga)
    console.log('cual es el estado: ', estado)
    if (user.seguimientoManga.length === 0) {
      user.seguimientoManga.push({ manga: manga._id, seguimiento: estado })
      await user.save()
      return res.status(200).json({ seguimiento: user.seguimientoManga })
    }
    const checkSegumiento = user.seguimientoManga.find(s => s.manga.toString() === manga._id.toString())
    if (checkSegumiento) {
      console.log('existe')
      checkSegumiento.seguimiento = estado
    } else {
      console.log('no existe')
      user.seguimientoManga.push({ manga: manga._id, seguimiento: estado })
    }

    await user.save()
    res.status(200).json({ seguimiento: user.seguimientoManga })
  } catch (error) {
    console.error(error)
  }
})

seguimientoRouter.post('/capitulo/:idCap', authenticateToken, async (req, res) => {
  const { user, params, body } = req
  const { idCap } = params
  const { idManga } = body
  console.log('hola')
  try {
    const userEcontrado = await Usuario.findById(user.usuario.id)
    const userCapitulo = userEcontrado.seguimientoManga.find(s => s.manga.toString() === idManga.toString())
    console.log('userCapitulo: ', userCapitulo)
    const capitExist = userCapitulo.capitulosVistos.find(c => c.capitulo.toString() === idCap.toString())
    if (capitExist) {
      return res.status(200).json({ capituloVisto: 'Ya sigues este capitulo' })
    }
    const nuevoCapitulo = { capitulo: idCap, manga: idManga }
    userCapitulo.capitulosVistos.push(nuevoCapitulo)
    await userEcontrado.save()
    res.status(200).json({ seguimiento: userEcontrado.seguimientoManga })
  } catch (error) {

  }
})

module.exports = seguimientoRouter
