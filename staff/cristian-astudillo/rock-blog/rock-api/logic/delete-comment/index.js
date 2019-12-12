// const { models: { Comment }} = require('rock-data')
// const { validate } = require('rock-util')

// const deleteComment = (id) => {
//     validate.string(id)

//     return(async () => {
//         const user = await Comment.deleteOne({_id:id})

//         if(!user) throw new Error (`User with id ${id} does not exists`)

//         await Comment.findOneAndRemove({_id:id})
//     })
// }

// module.exports = deleteComment

// TO DO !!!!!