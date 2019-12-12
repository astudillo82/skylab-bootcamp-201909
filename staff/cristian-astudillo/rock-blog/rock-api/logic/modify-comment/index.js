const { models: { User, Comment } } = require('rock-data')
const { validate } = require('rock-util')

/**
 * Modify Comment
 * 
 * @param {String} id 
 * @param {String} message 
 * 
 * @throws {Error} To Validate id string
 * @throws {Error} To validate message string
 * 
 * @example
 *       const id = '5debbfba23be5a63d0f0b927' * 
 * 
 */

const modifyComment = (id, message) => {
    validate.string(id)
    validate.string(message)

    return (async () => {
        const user =  await User.findById(id)

        if(!user) throw new Error(`User with id ${id} does not exists`)

        await Comment.updateOne({_id: ObjectId(CommentId)}, {$set:message})
    })()
}

module.exports = modifyComment