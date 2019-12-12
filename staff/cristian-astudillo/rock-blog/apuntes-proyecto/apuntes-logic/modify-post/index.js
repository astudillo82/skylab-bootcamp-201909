//MODIFY-POST/INDEX.JS : AQUÍ SE CREA LA LÓGICA DE LA MODIFICACIÓN DE LOS POST

//Se exporta el modelo "User", "Post" para poder trabajar con el esquema de usuario y poder validarlos
const { models: { User, Post } } = require('rock-data')

//Se exporta "validate" para poder validar datos primitivos del validate.js
const { validate } = require('rock-util')

//Se guardan las propiedades en una constante llamada "modifyPost"  para luego poder validarlas desde "validate.js"
const modifyPost = (id, description) => {
    validate.string(id)    
    validate.string(description)    

    return(async() =>{
        const user = await User.findById(id)
        
        if(!user) throw new Error(`User with id ${id} does not exists`)

        //updateOne(), actualiza/modifica el contenido a través del _id como 1º parámetro
        await Post.updateOne({ _id: ObjectId(postId) }, {$set:description})
      
    })()
}
//Se usa "MODULE.EXPORTS" para poder exportarlo
module.exports = modifyPost