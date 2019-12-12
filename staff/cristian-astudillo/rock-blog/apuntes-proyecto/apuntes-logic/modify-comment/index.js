//MODIFY-COMMENT/INDEX.JS : AQUÍ SE CREA LA LÓGICA DE LA MODIFICACIÓN DE COMENTARIOS

//Se exportan los modelos "User", "Comment" para poder trabajar con el esquema de usuario y poder validarlos
const { models: { User, Comment } } = require('rock-data')

//Se exporta "validate" para poder validar datos primitivos del validate.js
const { validate } = require('rock-util')

//Se guardan las propiedades en una constante llamada "modifyComment" para luego poder validarlas desde "validate.js"
const modifyComment = (id, message) => {
    validate.string(id)
    validate.string(message)

    return (async () => {
        const user =  await User.findById(id)

        if(!user) throw new Error(`User with id ${id} does not exists`)

        //updateOne(), actualiza/modifica el contenido a través del _id como 1º parámetro
        await Comment.updateOne({_id: ObjectId(CommentId)}, {$set:message})
    })()
}

//Se usa "MODULE.EXPORTS" para poder exportarlo
module.exports = modifyComment