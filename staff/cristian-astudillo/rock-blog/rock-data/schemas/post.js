//POST.JS: CONSTRUCCIÓN DEL ESQUEMA DE POST DE NUESTRO BLOG

// Está requiriendo la librería "Mongoose", con el constructor "Schema"
const { Schema, ObjectId } = require('mongoose')

// Embed
const Comment = require('./comment')

//NOS BASAMOS EN EL "MODEL DATA" PARA PODER CONSTRUR UN ESQUEMA DE POST PARA NUESTRO PROYECTO(TITLE, DESCRIPTION)
module.exports = new Schema({
    title: {
        type: String,
        require : true    
    },

    description: {
        type: String,
        required:true
    },

    owner: {
        type: ObjectId,
        ref: 'User'
    },

    comments: [Comment]
})