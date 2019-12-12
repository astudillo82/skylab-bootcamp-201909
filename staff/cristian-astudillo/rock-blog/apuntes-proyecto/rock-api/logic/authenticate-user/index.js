const { models: { User } } = require('rock-data')
const { validate } = require('rock-util')

/**  
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
 *     logic.authenticateUser('johnDoe', 'jghdfs765')
 * 
 */

const authenticateUser = (username, password) =>{
    validate.string(username)
    validate.string(password)

    return(async () => {
    const user = await User.findOne({username})
    if(!user) throw new Error(`User with username ${username} does not exists`)

    if(password !== user.password) throw new Error(`Wrong Credentials`)

    return user._id.toString()

    })()
}

module.exports = authenticateUser