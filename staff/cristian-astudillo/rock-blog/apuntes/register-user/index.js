//REGISTER-USER/INDEX.JS : AQUÍ SE CREA LA LÓGICA DEL REGISTRO DE USUARIOS

//Se exporta el modelo "user" para poder trabajar con el esquema de usuario y poder validarlos
const { models: { User }} = require('rock-data')

//Se exporta el "VALIDATE" para poder validar los datos si son correctos o no
const { validate } = require('rock-util')

/**
 * Register User
 * 
 * @param {String} name 
 * @param {String} surname 
 * @param {String} email 
 * @param {String} username 
 * @param {String} password 
 * 
 * @throws {Error} to validate name data
 * @throws {Error} to validate surname data
 * @throws {Error} to validate email data
 * @throws {Error} to validate username data
 * @throws {Error} to validate password data
 * 
 * @return {Object} UserCreate
 * 
 * @example 
 *  
 *       logic.registerUser('pepe', 'grillo', 'pepe@grillo.com' ,'pepito', 'jghdfs765')  
 * 
 */


//Se guardan las propiedades en una constante llamada "registerUser"  para loego poder validarlas desde "validate.js"

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

module.exports = registerUser

