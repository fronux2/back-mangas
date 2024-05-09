const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://try-bd:KRGsBY3mZy6f6XRR@cluster0.cgvnn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(console.log('conexion ala db correcta'))
