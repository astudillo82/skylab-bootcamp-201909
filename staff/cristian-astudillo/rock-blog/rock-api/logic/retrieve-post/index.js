const { ObjectId, models : { User, Post } } = require('rock-data')
const { validate } = require('rock-util')

/**
 * 
 * @param {String} id 
 * @param {String} postId 
 * 
 * @throws {Error} To validate id string
 * @throws {Error} To validate postId string
 * @throws {Error} To check correct user and post data
 * @throws {Error} To check unexisting user and post data
 * 
 * 
 * 
 */
const retrievePost = (id, postId) => {
    validate.string(id)
    validate.string(postId)

    return (async () => {
        const user = await User.findById(id).lean()
        if(!user) throw new Error(`User with id ${id} does not exists`)

        const post = await Post.findById(postId).lean() 
        if(!post) throw new Error(`User with id ${id} does not match to post with id ${postId}`)       

        await Post.findOne({_id: ObjectId(postId)})      

    })()
}


module.exports = retrievePost