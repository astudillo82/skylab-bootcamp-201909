// require('dotenv').config()
// const { env : { TEST_DB_URL } } = process
// const { expect } = require('chai')
// const logic = require('../delete-comment')
// const { database, ObjectId, models: { User, Post, Comment } } = require('rock-data')

// describe('Logic - Delete Comment', () =>{

//     before(() => database.connect(TEST_DB_URL))

//     let id,id_post, id_comment, name, surname, username, email, password, message, date

//     beforeEach(async () => {
        
//         name = `name-${Math.random()}`
//         surname = `surname-${Math.random()}`
//         username = `username-${Math.random()}`
//         email = `email-${Math.random()}@email.com`
//         password = `password-${Math.random()}`

//         await Promise.all([User.deleteMany(), Comment.deleteMany()])

//         const user = await User.create({ name, surname, username, email, password })
//         id = user.id

//         title = `title-${Math.random()}`
//         description = `description-${Math.random()}`

        

//         const post = await Post.create({title, description, owner:ObjectId(id)})
//         id_post = post.id


//         message = `message-${Math.random()}`
//         owner = `owner-${Math.random()}`
//         date = `date-${Math.random()}`
        
        
//         const comment = await Comment.create({message, owner:ObjectId(id), date: new Date})
//         id_comment = comment.id
//     })

//         it('Should to delete comment if it is incorrect date', () => {
//             expect(() => logic.deleteComment(1)).to.throw(Error, '1 is not a string')
//         })   
        

//         it('Should to delete comment if the id is incorrect', async () => {
//         const id = '5de4e692f53ec15feb3774b5'

//             try {
//                 await logic.deleteComment(id)
//             } catch(error) {
//                 expect(error.message).to.equal(`User with id ${id} does not exists`)
//             }
//         })


//         after(() => Promise.all([User.deleteMany(), Comment.deleteMany()]).then(database.disconnect))
//     })
    


// TO DO !!!!