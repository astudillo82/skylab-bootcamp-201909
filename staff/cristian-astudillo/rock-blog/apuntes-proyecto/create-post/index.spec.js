require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const logic = require('../index')
const { database, models: { User, Post } } = require('rock-data')

describe('Logic - Create Post', () => { 

    before(()=> database.connect(TEST_DB_URL))

    let id, name, surname, username, email, password, title, description

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `pasword-${Math.random()}`

        await Promise.all([User.deleteMany(), Post.deleteMany()])

        const user = await User.create({name, surname, username, email, password})

        id = user.id    

        title = `title-${Math.random()}`
        description = `description-${Math.random()}`

    })      
    
    it ('Should to create post if they are incorrect data', () => {         
        expect(()=> logic.createPost(1,password)).to.throw(Error, '1 is not a string')
        expect(()=> logic.createPost(username,1)).to.throw(Error, '1 is not a string')
    })


    it ('should to get correct user and post data', async () => { 
        const postId = await logic.createPost(id,title,description)
         
        expect(postId).to.exist
        expect(postId).to.be.a('string')
        expect(postId).to.have.length.greaterThan(0)

        const post = await Post.findById(postId)

        expect(post).to.exist
        expect(post.id).to.equal(postId)
        expect(post.title).to.equal(title)
        expect(post.description).to.equal(description)

    })

    after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(database.disconnect))

})