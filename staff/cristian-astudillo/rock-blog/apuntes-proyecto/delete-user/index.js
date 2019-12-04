//DELETE-USER/INDEX.JS : AQUÍ SE CREA LA LÓGICA DE LA ELIMINACIÓN DE USUARIOS

//Se exporta el modelo "user" para poder trabajar con el esquema de usuario y poder validarlos
const { models: { User }} = require('rock-data')

//Se exporta el "VALIDATE" para poder validar los datos si son correctos o no

const { validate } = require('rock-util')
//Se guardan las propiedades en una constante llamada "deleteUser" para loego poder validarlas desde "validate.js"
const deleteUser = (id) => { 
    validate.string(id)   

    return(async () => {
        //Se usa findOne() para obtener el _id
        const user = await User.findOne({_id:id})

        if(!user) throw new Error(`User with username ${username} does not exists`)

        //deleteOne ()para elmimnar el usuario a través del _id
        await User.deleteOne({_id:id})
    })
}

//Se usa "MODULE.EXPORTS" para poder exportarlo
module.exports = deleteUser