require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const logic = require('../index')
const { database, ObjectId, models: { User, Comment } } = require('rock-data')


describe('Logic - Modify Comment', () => {

    before(() => database.connect(TEST_DB_URL))

    let id, name, surname, username, email, password, message, date

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`

        await Promise.all([User.deleteMany(), Comment.deleteMany()])

        const user = await User.create({ name, surname, username, email, password })        
        id = user.id

        // title = `title-${Math.random()}`
        // description = `description-${Math.random()}`
        // owner = `owner-${Math.random()}`
      
        
        // const post = await Post.create({ title, description, owner:ObjectId(id), date:new Date })
        // id_post = post.id
        
        
        message = `message-${Math.random()}`
        owner = `owner-${Math.random()}`
        
        
        const comment = await Comment.create({ message, owner:ObjectId(id), date:new Date })
        id_comment = comment.id
        
    })

    it('Should to modify user if they are incorrect dates', () => {
        expect(() => logic.modifyComment(1,message)).to.throw(Error, '1 is not a string')
        expect(() => logic.modifyComment(id, 1)).to.throw(Error, '1 is not a string')
    })

    it('Should to modify comment if the id is incorrect', async () => {
        const id = '5debbfba23be5a63d0f0b927'
     
        try {
            await logic.modifyComment(id, message)
        } catch(error) {
            expect(error.message).to.equal(`User with id ${id} does not exists`)
        }
    })


    after(() => Promise.all([User.deleteMany(), Comment.deleteMany()]).then(database.disconnect))

})