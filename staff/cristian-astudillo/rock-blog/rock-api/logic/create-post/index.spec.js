require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const logic = require('../index')
const { database, models: { User, Post } } = require('rock-data')

describe('Logic - Create Post', () => { 

    before(()=> database.connect(TEST_DB_URL))

    let id, name, surname, username, email, password, title, description

    beforeEach(() => {
        name = `name-${Math.random()}`
        surnamne = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}`
        password = `pasword-${Math.random()}`

        await Promise.all([User.deleteMany(), Post.deleteMany()])

        const user = await User.create({name, surname, username, email, password})

        id = user.id

        title = `title-${Math.random()}`
        description = `description-${Math.random}`

    })

    it ('should to get correct user and post', async () =>{
        const postId = await logic.createPost(id,title,description)
         
        expect(postId).to.exist
        expect(postId.user).to.be.a('string')



    })


after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(database.disconnect))

})