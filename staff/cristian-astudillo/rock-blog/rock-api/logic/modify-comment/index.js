const { models: { User, Comment } } = require('rock-data')
const { validate } = require('rock-util')


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