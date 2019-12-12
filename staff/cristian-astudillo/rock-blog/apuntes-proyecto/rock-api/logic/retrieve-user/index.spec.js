require('dotenv').config() 
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const  logic  = require('../')
const { database, models: { User } } = require('rock-data')


describe('Logic - Retrieve User', () => {

    before (() => database.connect(TEST_DB_URL))

    let id, name, surname, username, email, password

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`

        user = await User.create({name, surname, username, email, password})

        id = user.id
    })

    it('Should to retrieve user if they are correct dates', async () => {

        const user = await logic.retrieveUser(id)
        
        expect(user).to.exist
        expect(user.id).to.equal(id)
        
        expect(user.name).to.equal(name)
        expect(user.name).to.be.a('string')
        expect(user.surname).to.equal(surname)
        expect(user.surname).to.be.a('string')
        expect(user.username).to.equal(username)
        expect(user.username).to.be.a('string')
        expect(user.email).to.equal(email)
        expect(user.email).to.be.a('string')
        expect(user.posts).to.be.an('array').that.is.empty
    })

    it('Should to retrieve user if it is incorrect ID', async () =>{
        const id = '5de4e692f53ec15feb3774b5'

        try {
            user = await logic.retrieveUser(id)
        }catch(error){
            expect(error.message).to.equal(`User with ${id} does not exists`)
        }
    })

    after(() => User.deleteMany().then(database.disconnect))

})
