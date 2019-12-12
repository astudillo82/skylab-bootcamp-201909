const { models : { User }} = require('rock-data')
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

const retrieveUser = (id) =>{
    validate.string(id)

    return (async () => {
        let user = await User.findById(id).lean()

        if(!user) throw new Error(`User with ${id} does not exists`)

        user.id = user._id.toString()

        delete user._id
        delete user.__v

        return user
    })()
}

module.exports = retrieveUser