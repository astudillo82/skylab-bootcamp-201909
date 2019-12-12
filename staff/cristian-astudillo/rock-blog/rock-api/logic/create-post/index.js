const { models: { User, Post } } = require('rock-data')
const { validate } = require('rock-util')

/**
 * Create Posts
 * 
 * @param {String} id 
 * @param {String} title 
 * @param {String} description 
 * 
 * @throws {Error} to validate id string
 * @throws {Error} to validate title string
 * @throws {Error} to validate description string
 * @throws {Error} to validate correct user
 * @throws {Error} to validate correct post
 */

const createPost = (id, title, description) => {
    validate.string(id)
    validate.string(title)
    validate.string(description)  

    return(async() =>{
        const user = await User.findById(id)

        if(!user) throw new Error(`User with id ${id} not found`)

        const post = await Post.create({ owner:id, title, description })

        return post.id
        
    })()
}

module.exports = createPost
