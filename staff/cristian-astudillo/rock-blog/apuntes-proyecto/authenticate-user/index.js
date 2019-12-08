//AUTHENTICATE-USER/INDEX.JS : AQUÍ SE CREA LA LÓGICA DE LA AUTENTICACIÓN DE USUARIOS

//Se exporta el modelo "User" para poder trabajar con el esquema de usuario y poder validarlos
const { models: { User }} = require('rock-data')

//Se exporta "validate" para poder validar datos primitivos del validate.js
const { validate } = require('rock-util')

 // Se usan los paŕametros del modelo "User" para poder validarlos si son strings o no
const authenticateUser = (username, password) => { 
    validate.string(username)
    validate.string(password)

    // Una vez que son validados "username" y "password", accedemos a la base de datos para buscar el "username"  
    return (async () => {   
        //Se usa findOne() para obtener el "username" desde el esquema 'user.js" y guardarlo desde una constante
        const user = await User.findOne({username})

        //Si el "user" es falso, lanzará error
        if(!user) throw new Error('User with username ' + username + ' does not exist') 

        //Si el password es distinto al "user.password", lanzará error     
         if(password !== user.password) throw new Error ('Wrong credentials') 

        //_id es un object, así que usamos toString para que nos devuelva un string
        return user._id.toString() 

    })()
}

//Se usa "MODULE.EXPORTS" para poder exportarlo
module.exports =  authenticateUser