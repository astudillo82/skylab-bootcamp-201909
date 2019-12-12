//DELETE-POSTS/INDEX.JS : AQUÍ SE CREA LA LÓGICA DEL REGISTRO DE USUARIOS

//Se exporta el modelo "User", "Post" para poder trabajar con el esquema de usuario y poder validarlos
const { models: { User, Post}} = require('rock-data')

//Se exporta "validate" para poder validar datos primitivos del validate.js
const { validate } = require('rock-util')

//Se guarda la propiedad "id" en una constante llamada "deletePost" para luego poder validarla desde "validate.js"
const deletePost = (id ) => {
    validate.string(id)   

    return(async () => {
        const user = await User.findOne({_id:id})

        if(!user) throw new Error(`User with id ${id} does not exists`)

        await Post.findOneAndRemove({_id:id}) 
        
    })()

}


//Se usa "MODULE.EXPORTS" para poder exportarlo
module.exports = deletePost