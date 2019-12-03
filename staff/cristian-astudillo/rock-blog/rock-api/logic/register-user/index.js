const { models: { User }} = require('rock-data')
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
const registerUser = (name, surname, email, username, password) => {
    validate.string(name)
    validate.string(surname)
    validate.email(email)
    validate.string(username)
    validate.string(password)      
         
    return (async () => {        
        await User.create({ name, surname, email, username, password })    
    })()
}

module.exports = registerUser

