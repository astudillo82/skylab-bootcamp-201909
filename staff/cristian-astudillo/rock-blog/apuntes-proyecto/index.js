//ROCK-API/INDEX.JS: AQUÍ HACEMOS USO DE TODAS LAS LIBRERÍAS Y/O ARCHIVOS QUE NECESITEMOS


// Requiere "DOTENV" para permitir guardar secreto desde del archivo .env(passwords, etc).
require('dotenv').config()

// Requiere "EXPRESS"(AL VER LA CARPETA NODE_MODULES, SE ENCUENTRA EN ORDEN ALFABÉTICO)
const express = require('express')

// Requiere nombre, versión desde del package.json
const { name, version } = require('./package.json')

const { argv: [ /*node*/ , /*path*/ , port], env: { PORT = port || 8080, DB_URL } } = process 

// Requiere CORS para acceder a recursos de diferentes dominios
const cors = require('./utils/cors')

// Requiere "database" desde "rock-data" para conectar/desconectar a la base de datos
const { database } = require('rock-data')

//Se invoca express() ya que es nuestro servidor 
const api = express()

// 2º: luego de entrar a "api.use('/api', routes)", entra aquí
const routes = require('./routes')

api.use(cors) 
api.options('*', cors, (req, res) => { 
    res.end()
})

// 1º: Al hacer la petición desde POSTMAN , entra aquí, va a "api.use('/api', routes)"
api.use('/api', routes)

// Permite conectar y luego escucha el puerto para poder arrancar desde el servidor
database.connect(DB_URL)
    .then(() => {
        api.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`))
    })