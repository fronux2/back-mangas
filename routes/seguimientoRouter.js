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
    if (user.seguimientoManga.length === 0) {
      user.seguimientoManga.push({ manga: manga._id, seguimiento: estado })
      await user.save()
      return res.status(200).json({ seguimiento: user.seguimientoManga })
    }
    const checkSegumiento = user.seguimientoManga.find(s => s.manga.toString() === manga._id.toString())
    if (checkSegumiento) {
      checkSegumiento.seguimiento = estado
    } else {
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
  const { idManga, nCapitulo } = body
  try {
    const userEcontrado = await Usuario.findById(user.usuario.id)
    const userCapitulo = userEcontrado.seguimientoManga.find(s => s.manga.toString() === idManga.toString())
    const capitExist = userCapitulo.capitulosVistos.find(c => c.capitulo.toString() === idCap.toString())
    if (capitExist) {
      return res.status(200).json({ capituloVisto: 'Ya sigues este capitulo' })
    }
    const nuevoCapitulo = { capitulo: idCap, manga: idManga, nCapitulo }
    userCapitulo.capitulosVistos.push(nuevoCapitulo)
    await userEcontrado.save()
    res.status(200).json({ seguimiento: userEcontrado.seguimientoManga })
  } catch (error) {

  }
})

seguimientoRouter.get('/capitulo/:mangaId', authenticateToken, async (req, res) => {
  const { user, params } = req
  const { mangaId } = params
  try {
    const usuario = await Usuario.findById(user.usuario.id)
    const manga = usuario.seguimientoManga.find(s => s.manga.toString() === mangaId)
    const capitulosVistos = manga.capitulosVistos.filter(c => c.manga.toString() === mangaId)
    const maxNCap = Math.max(...capitulosVistos.map(obj => obj.nCapitulo))
    res.json(maxNCap)
  } catch (error) {

  }
})

seguimientoRouter.post('/manga/maxVisto/:mangaId', authenticateToken, async (req, res) => {
  const { user, params } = req
  const { mangaId } = params
  try {
    const usuario = await Usuario.findById(user.usuario.id)
    const encontrado = usuario.maxVisto.find(m => m.manga.toString() === mangaId)
    if (encontrado) {
      return res.json({ error: 'Ya has visto este manga' })
    }
    usuario.maxVisto = usuario.maxVisto.concat({ manga: mangaId })
    await usuario.save()
    res.json(usuario.maxVisto)
  } catch (error) {

  }
})

seguimientoRouter.put('/manga/maxVisto/:mangaId', authenticateToken, async (req, res) => {
  const { user, params, body } = req
  const { maxVisto } = body
  const { mangaId } = params
  const usuarioModificado = await Usuario.findOneAndUpdate(
    { _id: user.usuario.id, 'maxVisto.manga': mangaId },
    { $set: { 'maxVisto.$.maxVisto': maxVisto } },
    { new: true, upsert: true }
  )
  res.json(usuarioModificado)
})

seguimientoRouter.get('/manga/maxVisto/:mangaId', authenticateToken, async (req, res) => {
  const { user, params } = req
  const { mangaId } = params
  try {
    const usuario = await Usuario.findById(user.usuario.id)
    const encontrado = usuario.maxVisto.find(m => m.manga.toString() === mangaId)
    if (!encontrado) {
      return res.json({ error: 'No has visto este manga' })
    }
    res.json(encontrado.maxVisto)
  } catch (error) {

  }
})

// usuarioOn
seguimientoRouter.get('/usuario', authenticateToken, async (req, res) => {
  res.send(true)
})

// grupoOn comprueba si el usuario tiene grupos
seguimientoRouter.get('/grupo', authenticateToken, async (req, res) => {
  const { user } = req
  const userEncontrado = await Usuario.findById(user.usuario.id)
  if (userEncontrado.grupos.length === 0) {
    return res.send(false)
  } else {
    return res.send(true)
  }
})

module.exports = seguimientoRouter
