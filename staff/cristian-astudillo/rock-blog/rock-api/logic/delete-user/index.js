const { models: { User }} = require('rock-data')
const { validate } = require('rock-util')

/**  
 * Delete User
 * 
 * @param {String} id 
 * 
 * @throws {Error} to validate id string
 * @throws {Error} to validate wrong user
 * 
 * @example
 *      username = 'johnDoe'
 * 
 */

const deleteUser = (id) => { 
    validate.string(id)   

    return(async () => {

        const user = await User.findOne({_id:id})

        if(!user) throw new Error(`User with username ${username} does not exists`)

        await User.deleteOne({_id:id})
    })()
}

module.exports = deleteUser