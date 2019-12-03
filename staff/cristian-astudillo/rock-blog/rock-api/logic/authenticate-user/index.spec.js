// ROCK-API/LOGIC/AUTHENTICATE-USER/INDEX.SPEC.JS :  REALIZA EL TESTING PARA EVITAR ERRORES UNA VEZ EJECUTADO EL PROYECTO.

require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const  logic  = require('../index')
const { database, models: { User } } = require('rock-data')


describe('Logic - Authenticate User', () => {

    //before(), la función dentro de before se va a ejecutar antes del primer test dentro del describe.
    before(() => database.connect(TEST_DB_URL))

    let name, surname, email, username, password, id

    //beforeEach(), la función dentro de beforeEach se va a ejecutar antes de cada test dentro del describe. 
    beforeEach(async () => {
        await User.deleteMany()
        
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        username = `username-${Math.random()}`
        password = `password-${Math.random()}`

        await User.create({ name, surname, email, username, password })

            const user = await User.findOne({email}).lean()

            id = user._id.toString()
    })


    it('Should to authenticate user if they are incorrect data', () => {
        expect(() => logic.authenticateUser(1, password)).to.throw(Error,'1 is not a string')
        expect(() => logic.authenticateUser(username, 1)).to.throw(Error,'1 is not a string')    
    })


    it('Should to authenticate user on correct credentials', async () => {
        const userId = await logic.authenticateUser(username, password)
        expect(userId).to.equal(id)
    })

    it('Should to authenticate user if it is incorrect username', async () => {
        username = 'johnDoe'

        try {
            await logic.authenticateUser(username, password)

        } catch (error) {
            expect(error.message).to.equal(`User with username ${username} does not exist`)
        }
    })

    it('Should to authenticate user if it is incorrect password', async () => {
        password = 'johnDoe'

        try {
            await logic.authenticateUser(username, password)
        } catch (error) {
            expect(error.message).to.equal(`Wrong credentials`)
        }
    })

    // Una vez que nos pase el test, nos permite deleteMany limpia el usuario creado (User.create) y luego (then()) nos desconecta, sino seguirá ejecutándose o "runeando"
    after(() => User.deleteMany().then(database.disconnect))
})