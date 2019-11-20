require('dotenv').config()
const { env: { DB_URL_TEST}} = process
const { expect } = require('chai')
const registerUser = require('.')
const { ContentError } = require('../../utils/errors')
const { random } = Math
const { database, models: {User }} = require('../../data')

describe('logic - register user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, username, password

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname -${random()}`
        email = `email-$${random()}`
        username = `password-${random()}`
        password = `password-${random()}`


        return User.deleteMany()
    })

    it('should succeed on correct credentials', () =>
        registerUser(name, surname, email, username, password)
        .then(response =>{
            expect(response).to.be.undefined

            return User.findOne({ username })
        })
    
    
    
    )


})