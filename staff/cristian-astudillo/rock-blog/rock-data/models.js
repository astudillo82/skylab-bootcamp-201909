// ROCK-DATA/MODELS.JS: AQUÍ REQUIERE "MONGOOSE" Y LOS "SQUEMAS". 

// Está requiriendo la librería "Mongoose", con el constructor "model" que permnite compilar/definir modelos
const { model } = require('mongoose')

//Está requiriendo el index de los esquemas
const { user, post, comment } = require('./schemas')

//LUEGO EXPORTA LOS MODELOS "USER", "POST", "COMMENT"
module.exports = {
    User: model('User', user),
    Post: model('Post', post), 
    Comment: model('Comment', comment)
}