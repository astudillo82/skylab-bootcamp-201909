const { models: { User } } = require('rock-data')
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
 *       logic.registerUser('pepe', 'grillo', 'pepe@grillo.com' ,'pepito', 'jghdfs765')  
 * 
 */

const registerUser = (name, surname, username, email, password) => {
    validate.string(name)
    validate.string(surname)
    validate.string(username)
    validate.email(email)
    validate.string(password)

    return (async () =>  {
        const user = await User.findOne({ username, email })

        if(user) throw new Error('This user already exists')

        await User.create({name, surname, username, email, password})
 })()
}

module.exports = registerUser;