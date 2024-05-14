const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const Authorization = req.get('Authorization')
    if (!Authorization || !Authorization.startsWith('Bearer')) {
      return res.json('error:autenticacion erronea')
    }
    const token = Authorization.substring(7)
    const decodeToken = jwt.verify(token, process.env.SECRET)
    const { usuario } = decodeToken
    req.userId = usuario.id
    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
}
