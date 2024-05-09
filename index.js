const express = require('express')
const app = express()

require('./mongodb')
const PORT = 3000

app.get('/', (req, res) => res.status(200).send('Hola mundo como estas'))

app.listen(PORT, () => {
  console.log(`conexion correcta al puerto ${PORT}`)
})
