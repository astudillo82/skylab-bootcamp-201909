const { models: { User }} = require('rock-data')
const { validate } = require('rock-util')

 /**
 * Update User
 * 
 * @param {Strind} id 
 * @param {Object} update 
 * 
 * @throws {Error} to validate id data
 * @throws {Error} to validate update data
 * @throws {Error} correct credentials
 * @throws {Error} incorrect username
 * 
 * @example  
 *      logic.updateUser(1, update)
 * 
 */
const updateUser = (id, update) =>{
    validate.string(id)
    validate.object(update)

    return(async () =>{
        const user = await User.findOne({_id:id})

        if(!user) throw new Error(`User with username ${username} does not exists`)

        await User.updateOne({_id:user.id},{$set:update})
    })()

}

module.exports = updateUser