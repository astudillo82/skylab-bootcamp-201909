const { models : { User, Post } } = require('rock-data')
const { validate } = require('rock-util')

const retrievePost = (id, postId) => {
    validate.string(id)
    validate.string(postId)

    return (async () => {
        const user = await User.findById(id).lean()
        if(!user) throw new Error(`User with ${id} does not exists`)

        const post = await Post.findById(postId).lean 
        if(!post) throw new Error(`User does not the post with id ${postId}`)       

        await Post.findOne({_id: ObjectId(postId)})      

    })()
}


module.exports = retrievePost