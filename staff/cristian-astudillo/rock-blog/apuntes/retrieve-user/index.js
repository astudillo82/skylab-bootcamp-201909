//RETRIEVE-USER/INDEX.JS : AQUÍ SE CREA LA LÓGICA DE LA RECUPERACIÓN DE USUARIOS

//Se exporta el modelo "User" para poder trabajar con el esquema de usuario y poder validarlos
const { models: { User }} = require('rock-data')

//Se exporta el "VALIDATE" para poder validar los datos si son correctos o no
const { validate } = require('rock-util')

/**
 * Retrieve User
 * 
 * @param {String} id  
 * 
 * @return {Object} id
 * @return {Object} name
 * @return {Object} surname
 * @return {Object} email
 * @return {Object} username
 * @return {Object} lastAccess = Date of entry
 * 
 * @throws {Error} Id does not exists
 * 
 * @example
 *     logic.retrieveUser('5de4e692f53ec15feb3774b5')
 * 
 */

// Se usa el paŕametro "id" para poder validarlo si es un string o no
const retrieveUser = (id) => {
    validate.string(id)


return (async () => {
    
    //Se usa findById()
    let user  = await User.findById(id).lean()

    //Si el "user" es falso, lanzará error
    if (!user) throw new Error(`User with id ${id} does not exist`)

    //_id es un object, así que usamos toString para que nos devuelva un string
    user.id = user._id.toString()
    delete user._id//???
    delete user.__v//???

    //retorna "user"
    return user

    })()

}

//Se usa "MODULE.EXPORTS" para poder exportarlo
module.exports = retrieveUser