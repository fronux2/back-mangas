const grupoRouter = require('express').Router()
const Grupo = require('../models/grupoModel')
const authenticateToken = require('../middleware/middlewareLogin')
grupoRouter.get('/', async (req, res) => {
  const grupos = await Grupo.find({})
  res.json(grupos)
})

grupoRouter.post('/', authenticateToken, async (req, res, next) => {
  try {
    const { body, user } = req
    const usuarioId = user.usuario.id
    const { nombre, tipo } = body
    const nuevoGrupo = new Grupo({
      nombre,
      timestamp: new Date(),
      miembros: { usuarios: usuarioId },
      tipo
    })
    const savedGrupo = await nuevoGrupo.save()
    res.json(savedGrupo)
  } catch (error) {
    next(error)
  }
})

module.exports = grupoRouter
