const mongoose = require('mongoose')

mongoose.connect(process.env.CONECTION_STRING)
  .then(console.log('conexion ala db correcta'))
