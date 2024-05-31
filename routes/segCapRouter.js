const segCapRouter = require('express').Router()
const Usuario = require('../models/usuariosModel')
const Mangas = require('../models/mangasModel')
const authenticateToken = require('../middleware/middlewareLogin')

segCapRouter.post('/:idCap', authenticateToken, async (req, res) => {
  const { user, params } = req
  const { idCap } = params
  const userId = user.usuario.id

  try {
    const user = await Usuario.findById(userId)
    console.log(user)
  } catch (error) {

  }
})

module.exports = segCapRouter
