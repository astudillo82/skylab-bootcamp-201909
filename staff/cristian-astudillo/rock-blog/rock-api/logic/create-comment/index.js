const { models: { User, Comment } } = require('rock-data')
const { validate } = require('rock-util')

/**
 * 
 * @param {String} id 
 * @param {String} message 
 * 
 * @throws {Error} To validate id string
 * @throws {Error} To validate message string
 * @throws {Error} Wrong Credentials
 * @throws {Error} To check correct user and correct data
 * 
 * @return 
 * 
 * @example
 *      logic.createComment('jf7rbnfghdfg','This is a message')
 * 
 */


const createComment = (id, message) => {
    validate.string(id)
    validate.string(message)

    
    return(async () => {
        const user = await User.findById(id)

        if(!user) throw new Error (`User with id ${id} not found`)

        const comment = await Comment.create({owner:id, message, date:new Date})

        return comment.id
    })()
}

module.exports = createComment