//REGISTER-USER/INDEX.JS : AQUÍ SE CREA LA LÓGICA DEL REGISTRO DE USUARIOS

//Se exporta el modelo "User" para poder trabajar con el esquema de usuario y poder validarlos
const { models: { User }} = require('rock-data')

//Se exporta "validate" para poder validar datos primitivos del validate.js
const { validate } = require('rock-util')

//Se guardan las propiedades en una constante llamada "registerUser"  para luego poder validarlas desde "validate.js"
//Al ser una función, los parámetros deben de estar escritos en la misma posición que en "register/index.js"
const registerUser = (name, surname, email, username, password) => {
    validate.string(name)
    validate.string(surname)
    validate.email(email)
    validate.string(username)
    validate.string(password)      

    //Luego de las validaciones, se crea un usuario
    return (async () => {        
        await User.create({ name, surname, email, username, password })    
    })()
}

//Se usa "MODULE.EXPORTS" para poder exportarlo
module.exports = registerUser

