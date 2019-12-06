require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const logic = require('../index')
const { database, models: { User, Post, Comment } } = require('rock-data')


describe('Logic - Modify Post', () => {

    before(() => database.connect(TEST_DB_URL))

    let id, name, surname, username, email, password, description, date

    beforeEach(async () => {

        description = 'Everything'

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`

        await Promise.all([User.deleteMany(), Post.deleteMany()])

        const user = await User.create({ name, surname, username, email, password })
        id = user.id

        title = `title-${Math.random()}`
        description = `description-${Math.random()}`
        owner = `owner-${Math.random()}`
        date = `date-${Math.random()}`

        message = `message-${Math.random()}`
        owner = `owner-${Math.random()}`
        date = `date-${Math.random()}`

      
        const comment = new Comment({ message, owner:id, date })
       
        const post = await Post.create({ title, description, owner:id, date, comments:[comment] })
        id = post.id
    })

    it('Should to modify user if they are incorrect dates', () => {
        expect(() => logic.modifyPost(1,description)).to.throw(Error, '1 is not a string')
        expect(() => logic.modifyPost(id, 1)).to.throw(Error, '1 is not a string')
    })

    it('Should to modify post if the username is incorrect', async () => {
        username = 'John Doe'

        try {
            await logic.modifyPost(id, description)
        } catch (error) {
            expect(error.message).to.equal(`User with id ${id} does not exists`)
        }
    })

    after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(database.disconnect))

})