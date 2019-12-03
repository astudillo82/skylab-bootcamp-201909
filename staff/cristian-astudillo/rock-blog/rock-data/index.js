// ROCK-DATA/INDEX.JS: AQUÍ REQUIERE 'MONGOOSE" Y "MONGODB"


// Está requiriendo la librería "Mongoose", que permite exportar el módulo de "connect/disconnect", para conectar y desconectar el servidor
const { connect, disconnect } = require('mongoose') 

//Está requieriendo "mongoDB" con el constructor "ObjectId" desde el formato BSON
const { ObjectId } = require('mongodb')

//En este módulo. exporta "DATABASE" con un"CONNECT"/"DISCONNECT" , y los "MODELS"
module.exports = { 
    database: {
        connect(url) {
            return connect(url, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})            
        }, disconnect
    },
    
    //Los modelos que se requieren(en este caso "USER" Y "POST")
    models: require('./models'), ObjectId 
}
