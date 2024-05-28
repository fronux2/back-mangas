module.exports = (error, req, res, next) => {
  if (error.name === 'TypeError' && error.message.includes('capitulos')) {
    res.status(400).json({ error: 'El manga seleccionado no existe' })
  }
  if (error.name === 'TypeError' && error.message.includes('contrasena')) {
    res.status(400).json({ error: 'Usuario o contraseña incorrecto' })
  }
  if (error.name === 'TokenExpiredError') {
    res.status(400).json({ error: 'Sesion caducada, vuelve a iniciar sesions' })
  }
  if (error.name === 'MongoServerError') {
    res.status(400).json({ error: 'Nombre ya en existencia' })
  }
}
