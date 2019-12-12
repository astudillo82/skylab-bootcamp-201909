const { models: { User, Comment } } = require('rock-data')
const { validate } = require('rock-util')


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