//RETRIEVE-ALL-POSTS/INDEX.JS : AQUÍ SE CREA LA LÓGICA DE MOSTRAR TODOS LOS POSTS 

//Se exportan los modelos "User", "Post" para poder trabajar con el esquema de usuario y poder validarlos
const { models : { User, Post } } = require('rock-data')

//Se exporta "validate" para poder validar datos primitivos del validate.js
const { validate } = require('rock-util')


//Se guarda la propiedad con in 'id' en una constante llamada "retrieveAllPosts" para luego poder validarlas desde "validate.js"
const retrieveAllPosts = (id) => {
    validate.string(id)

    return(async() => {
        const user = await User.findById(id)
        
        if(!user) throw new Error(`User with ${id} not found`)

        const posts = await Post.find({owner:id}).lean()

        posts.forEach(post => {
            post.id = post._id.toString()
            delete post._id
            post.owner = id
        })

        return posts

    })()    
}

//Se usa "MODULE.EXPORTS" para poder exportarlo
module.exports = retrieveAllPosts