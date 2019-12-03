require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const logic = require('../')
const { database, models: { User } } = require('rock-data')


describe('Logic- Register User', () => {

    before(() => database.connect(TEST_DB_URL))

    let name, surname, username, email, password

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `pasword-${Math.random()}`
    })

    it ('Should to register the correct credentiasl', async() => {
        const response = await logic.registerUser(name, surname, username, email, password)
        expect(response).to.be.undefined

        const user = await User.findOne({ email, username }).lean()
        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.username).to.equal(username)
        expect(user.password).to.equal(password)
        expect(user.posts).to.be.an('array').that.is.empty    

    })    
    
    it('Register User are incorrect data', () => {
        expect(() => logic.registerUser(1, surname, username, email, password)).to.throw(Error,'1 is not a string')
        expect(() => logic.registerUser(name, 1, username, email, password)).to.throw(Error,'1 is not a string')
        expect(() => logic.registerUser(name, surname, 1, email, password)).to.throw(Error,'1 is not a string')      
        expect(() => logic.registerUser(name, surname, username,'a', password)).to.throw(Error,'a is not an email')
        expect(() => logic.registerUser(name, surname, username, email, 1)).to.throw(Error,'1 is not a string')
    })

    after(()=> User.deleteMany().then(database.disconnect))
})
