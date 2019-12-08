//CREATE-COMMENT/INDEX.JS : AQUÍ SE CREA LA LÓGICA DEL REGISTRO DE USUARIOS

//Se exporta el modelo "user", "Comment" para poder trabajar con el esquema de usuario y poder validarlos
const { models: { User, Comment } } = require('rock-data')

//Se exporta "validate" para poder validar datos primitivos del validate.js
const { validate } = require('rock-util')

//Se guardan las propiedades en una constante llamada "createComment" para luego poder validarlas desde "validate.js"
const createComment = (id, message) => {
    validate.string(id)
    validate.string(message)

    
    return(async () => {
        const user = await User.findById(id)

        if(!user) throw new Error (`User with id ${id} not found`)

        const comment = await Comment.create({owner:id, message, date:new Date})

        return comment.id
    })()
}

//Se usa "MODULE.EXPORTS" para poder exportarlo
module.exports = createComment