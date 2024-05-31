require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:4000'], // Reemplaza con el dominio de tu front-end
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Permitir cookies
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Headers']
}
app.use(cors(corsOptions))
const authenticateToken = require('./middleware/middlewareLogin')
const usuarioRouter = require('./routes/usuarioRouter')
const loginRouter = require('./routes/loginRouter')
const mangasRouter = require('./routes/mangasRouter')
const capitulosRouter = require('./routes/capitulosRouter')
const errorHandler = require('./middleware/errorHandler')
const generoRouter = require('./routes/generoRouter')
const tipoRouter = require('./routes/tipoRouter')
const estadoRouter = require('./routes/estadoRouter')
const demografiaRouter = require('./routes/demografiaRouter')
const registroRouter = require('./routes/registroRouter')
const seguimientoRouter = require('./routes/seguimientoRouter')
require('./config/mongodb')
const PORT = 4000

app.get('/', (req, res) => res.status(200).send('Hola mundo como estas'))

app.listen(PORT, () => {
  console.log(`conexion correcta al puerto ${PORT}`)
})

app.get('/login', (req, res) => {
  res.status(200).json({ user: 'marcos' })
})

app.get('/usuario', (req, res) => {
  res.status(200).json({ user: 'marcos' })
})

app.get('/auth/check', authenticateToken, (req, res) => {
  res.status(200).json({ user: req.user })
})

app.use('/login', loginRouter)
app.use('/usuario', usuarioRouter)
app.use('/mangas', mangasRouter)
app.use('/capitulos', capitulosRouter)
app.use('/generos', generoRouter)
app.use('/tipos', tipoRouter)
app.use('/estados', estadoRouter)
app.use('/demografias', demografiaRouter)
app.use('/registro', registroRouter)
app.use('/seguimiento', seguimientoRouter)
app.use(errorHandler)
