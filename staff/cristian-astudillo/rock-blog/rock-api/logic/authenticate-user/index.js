const { models: { User }} = require('rock-data')
const { validate } = require('rock-util')

/**
 * 
 * Authenticate User
 * 
 * @param {String} username 
 * @param {String} password
 * 
 * @throws {Error} To validate username string
 * @throws {Error} To validate password string
 * @throws {Error} To check user does not exist
 * @throws {Error} Wrong credentials 
 * 
 * @return {Object} UserId
 * 
 * @example
 *
 *     logic.authenticateUser('johnDoe', 'jghdfs765')
 * 
 */
const authenticateUser = (username, password) => { 
    validate.string(username)
    validate.string(password)

    // Una vez que son validados "username" y "password", accedemos a la base de datos para buscar el "username"  

    return (async () => {   
        const user = await User.findOne({username})

        //Si el "user" es distinto, lanzará error
        if(!user) throw new Error('User with username ' + username + ' does not exist') 

        //Si el password es distinto al "user.password", lanzará error
     
         if( password !== user.password) throw new Error ('Wrong credentials') 

        //_id es un object, así que usamos toString para que nos devuelva un string
        return user._id.toString() 

    })()
}

module.exports =  authenticateUser