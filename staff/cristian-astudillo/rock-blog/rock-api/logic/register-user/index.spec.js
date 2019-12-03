// ROCK-API/LOGIC/REGISTER-USER/INDEX.SPEC.JS :  REALIZA EL TESTING PARA EVITAR ERRORES UNA VEZ EJECUTADO EL PROYECTO.

require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const logic = require('../')
const { database, models: { User } } = require('rock-data')

describe('Logic - Register User', () => {

    before(() => database.connect(TEST_DB_URL))

    let name, surname, email, username, password

    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        username = `username-${Math.random()}`
        password = `password-${Math.random()}`


    })

    it('Should to register on correct credentials', async () => {

        const noResponse = await logic.registerUser(name, surname, email, username, password)
        
        expect(noResponse).to.be.undefined

        const user = await User.findOne({ email, username }).lean()

        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.username).to.equal(username)
        expect(user.password).to.equal(password)
        expect(user.posts).to.be.an('array').that.is.empty

    })

    it('Should to register user if they are incorrect data', () => {
       expect(() => logic.registerUser(1, surname, email, username, password)).to.throw(Error, '1 is not a string')
       expect(() => logic.registerUser(name, 1, email, username, password)).to.throw(Error, '1 is not a string')
       expect(() => logic.registerUser(name, surname, 'a', username, password)).to.throw(Error, 'a is not an email')
       expect(() => logic.registerUser(name, surname, email, 1, password)).to.throw(Error, '1 is not a string')
       expect(() => logic.registerUser(name, surname, email, username, 1)).to.throw(Error, '1 is not a string')
    })
    // Una vez que nos pase el test, nos permite deleteMany limpia el usuario creado (User.create) y luego (then()) nos desconecta, sino seguirá ejecutándose o "runeando"
    after(() => User.deleteMany().then(database.disconnect))

})