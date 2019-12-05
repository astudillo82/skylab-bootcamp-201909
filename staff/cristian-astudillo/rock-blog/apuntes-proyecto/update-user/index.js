//UPDATE-USER/INDEX.JS : AQUÍ SE CREA LA LÓGICA DE LA ACTUALIZACIÓN DE USUARIOS

//Se exporta el modelo "User" para poder trabajar con el esquema de usuario y poder validarlos
const { models: { User }} = require('rock-data')

//Se exporta el "VALIDATE" para poder validar los datos si son correctos o no
const { validate } = require('rock-util')

// Se usan los paŕametros "id, updates" para poder validarlos si es un string o no
const updateUser = (id, update) => {
    validate.string(id)
    validate.object(update)

    return(async () => {        
                
        const user = await User.findOne({_id:id})

        //Si findOne() no encuentra el esquema, retornará "null"(!user) 
        if(!user) throw new Error('User with username ' + username + ' does not exist')        
 
        //update-->por ejemplo {name, surname}
        //updateOne usa 2 parámetros: updateOne(propiedad a buscar, valor a cambiar)
        await User.updateOne({_id : user.id} ,{$set: update})  
    
    })()
}

//Se usa "MODULE.EXPORTS" para poder exportarlo
module.exports = updateUser 