const { models: { User, Post, Comment }} = require('rock-data')
const { validate } = require('rock-util')


const deletePost = (id /*description*/) => {
    validate.string(id)
    // validate.string(description)//??

    return(async () => {
        const user = await User.findOne({_id:id})

        if(!user) throw new Error(`User with id ${id} does not exists`)

        await Post.findOneAndRemove({_id:id}) //???
        
    })()

}

module.exports = deletePost