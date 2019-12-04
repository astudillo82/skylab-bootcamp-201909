const { models: { User, Post } } = require('rock-data')
const { validate } = require('rock-util')

const createPost = (id, title, description, owner) => {
    validate.string(id)
    validate.string(title)
    validate.string(description)
    validate.object(owner)

    return(async() =>{
        const user = await User.findById(id)

        if(!user) throw new Error(`User with id ${id} not found`)

        const post = await Post.create({user:id, title, description, owner})

        return post.id
    })()
}

module.exports = createPost
