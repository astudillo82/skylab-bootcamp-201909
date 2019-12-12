// ROCK-API/LOGIC/CREATE-POST/INDEX.SPEC.JS : REALIZA EL TESTING PARA EVITAR ERRORES UNA VEZ EJECUTADO EL PROYECTO.

//Se exporta el modelo "User", "Post" para poder trabajar con el esquema de usuario y poder validarlos
const { models: { User, Post } } = require('rock-data')

//Se exporta "validate" para poder validar datos primitivos del validate.js
const { validate } = require('rock-util')

//Se guardan las propiedades en una constante llamada "createPost"  para luego poder validarlas desde "validate.js"
const createPost = (id, title, description) => {
    validate.string(id)
    validate.string(title)
    validate.string(description)  

    return(async() =>{
        //asignamos en una constante "user" un findByMyId(id)
        const user = await User.findById(id)

        if(!user) throw new Error(`User with id ${id} not found`)

        //Luego de las validaciones, se crea un post
        const post = await Post.create({ owner:id, title, description })

        return post.id        
    })()
}

//Se usa "MODULE.EXPORTS" para poder exportarlo
module.exports = createPost
