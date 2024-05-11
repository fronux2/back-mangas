require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())

const usuarioRouter = require('./usuarioRouter')
const loginRouter = require('./loginRouter')
const mangasRouter = require('./mangasRouter')
const capitulosRouter = require('./capitulosRouter')

require('./mongodb')
const PORT = 3000

app.get('/', (req, res) => res.status(200).send('Hola mundo como estas'))

app.listen(PORT, () => {
  console.log(`conexion correcta al puerto ${PORT}`)
})

app.get('/login', (req, res) => {
  res.status(200).json({ user: 'marcos' })
})

app.use('/login', loginRouter)
app.use('/usuario', usuarioRouter)
app.use('/mangas', mangasRouter)
app.use('/capitulos', capitulosRouter)
