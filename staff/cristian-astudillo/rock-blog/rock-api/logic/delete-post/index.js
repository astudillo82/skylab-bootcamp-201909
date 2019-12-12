// const { models: { Post }} = require('rock-data')
// const { validate } = require('rock-util')
// /**
//  * Delete Post
//  * 
//  * @param {String} id
//  * 
//  * @throws {Error} to validate id string
//  * @throws {Error} to validate wrong user 
//  * 
//  * @example 
//  *      const id = '5de4e692f53ec15feb3774b5' 
//  * 
//  */

// const deletePost = (id) => {
//     validate.string(id)    

//     return(async () => {
//         const user = await Post.findOne({_id:id})

//         if(!user) throw new Error(`User with id ${id} does not exists`)

//         await Post.findOneAndRemove({_id:id})        
//     })()
// }

// module.exports = deletePost


// TO DO !!!!