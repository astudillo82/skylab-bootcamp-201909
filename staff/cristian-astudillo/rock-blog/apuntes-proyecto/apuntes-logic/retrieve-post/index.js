//RETRIEVE-POSTS/INDEX.JS : AQUÍ SE CREA LA LÓGICA DE MOSTRAR UN POST 

//Se exportan los modelos "User", "Post" para poder trabajar con el esquema de usuario y poder validarlos
const { ObjectId, models : { User, Post } } = require('rock-data')

//Se exporta "validate" para poder validar datos primitivos del validate.js
const { validate } = require('rock-util')

//Se guardan las propiedades 'id', 'postId' en una constante llamada "retrieveAllPosts" para luego poder validarlas desde "validate.js
const retrievePost = (id, postId) => {
    validate.string(id)
    validate.string(postId)

    return (async () => {
        const user = await User.findById(id).lean()
        if(!user) throw new Error(`User with id ${id} does not exists`)

        const post = await Post.findById(postId).lean() 
        if(!post) throw new Error(`User with id ${id} does not match to post with id ${postId}`)       

        await Post.findOne({_id: ObjectId(postId)})      

    })()
}

//Se usa "MODULE.EXPORTS" para poder exportarlo
module.exports = retrievePost