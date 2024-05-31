const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ message: 'Debes autenticarse' })

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' })
    req.user = user
    next()
  })
}

module.exports = authenticateToken
