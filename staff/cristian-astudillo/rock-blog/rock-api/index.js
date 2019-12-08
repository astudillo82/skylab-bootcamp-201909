//ROCK-API/INDEX.JS: AQUÍ HACEMOS USO DE TODAS LAS LIBRERÍAS Y/O ARCHIVOS QUE NECESITEMOS

require('dotenv').config()// Requiere "DOTENV" para permitir guardar secreto desde del archivo .env(passwords, etc).
const express = require('express')// Requiere "EXPRESS"(AL VER LA CARPETA NODE_MODULES, SE ENCUENTRA EN ORDEN ALFABÉTICO)
const { name, version } = require('./package.json')// Requiere nombre, versión desde del package.json
const { argv: [ /*node*/ , /*path*/ , port], env: { PORT = port || 8080, DB_URL } } = process //
const cors = require('./utils/cors') // Requiere CORS para acceder a recursos de diferentes dominios
const { database } = require('rock-data')// Requiere "database" desde "rock-data" para conectar/desconectar a la base de datos
// const { users } = require('./routes') //Requiere route para encasillar una ruta( en este caso "users" y "posts")
const api = express()//Se invoca express() ya que es nuestro servidor 

const routes = require('./routes')
api.use(cors) 
api.options('*', cors, (req, res) => { 
    res.end()
})
// ?? .use
// api.use('/users', users)  

// Permite conectar y luego escucha el puerto para poder arrancar desde el servidor
// database
//     .connect(DB_URL)
//     .then(() => api.listen(PORT, () => console.log (`${name} ${version} up and running on port ${PORT}`)))

api.use('/api', routes)

database.connect(DB_URL)
    .then(() => {
        api.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`))
    })