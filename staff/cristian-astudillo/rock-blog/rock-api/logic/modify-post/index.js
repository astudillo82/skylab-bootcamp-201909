const { models: { User, Post } } = require('rock-data')
const { validate } = require('rock-util')


const modifyPost = (id, description) => {
    validate.string(id)    
    validate.string(description)    

    return(async() =>{
        const user = await User.findById(id)
        
        if(!user) throw new Error(`User with id ${id} does not exists`)
     
        await Post.updateOne({ _id: ObjectId(postId) }, {$set:description})
      
    })()
}

module.exports = modifyPost