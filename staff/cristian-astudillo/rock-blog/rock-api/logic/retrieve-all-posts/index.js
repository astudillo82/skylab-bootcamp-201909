const { models : { User, Post } } = require('rock-data')
const { validate } = require('rock-util')


const retrieveAllPosts = (id) => {
    validate.string(id)

    return(async() => {
        const user = await User.findById(id)
        
        if(!user) throw new Error(`User with ${id} not found`)

        const posts = await Post.find({owner:id}).lean()

        posts.forEach(post => {
            post.id = post._id.toString()
            delete post._id
            post.owner = id
        })

        return posts

    })()    
}

module.exports = retrieveAllPosts