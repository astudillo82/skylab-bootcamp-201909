require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const logic = require('../index')
const { database, models: { User, Comment } } = require('rock-data')


describe('Logic - Create Comment', () => {

    before (()=> database.connect(TEST_DB_URL)) 

    let id, name, surname, username, email, password, message, date

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `pasword-${Math.random()}`
        
        await Promise.all([User.deleteMany(), Comment.deleteMany()])

        const user = await User.create({name, surname, username, email, password})        
        id = user.id
        
        
        message = `message-${Math.random()}`
        owner = `owner-${Math.random()}`      
       
        const comment = Comment.create({ message, owner:id, date:new Date })
        id_comment = comment.id 
       
    })

    it('Should to create comment if it is correct data', () => {
        expect(()=> logic.createComment(1, password)).to.throw(Error, '1 is not a string')
        expect(()=> logic.createComment(username, 1)).to.throw(Error, '1 is not a string')
    })

    it ('should to get correct user and comment data', async () => { 
        const commentId = await logic.createComment(id,message)
         
        expect(commentId).to.exist
        expect(commentId).to.be.a('string')
        expect(commentId).to.have.length.greaterThan(0)

        const comment = await Comment.findById(commentId)

        expect(comment).to.exist
        expect(comment.id).to.equal(commentId)
        expect(comment.message).to.equal(message)      

    })

    after(() => Promise.all([User.deleteMany(), Comment.deleteMany()]).then(database.disconnect))

}) 