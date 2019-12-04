require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const logic = require('../index')
const { database, models: { User } } = require('rock-data')

describe('Logic - Authenticate User' , () =>{

    before(() => database.connect(TEST_DB_URL))

    let name, surname, username, email, password, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`

        await User.create({name, surname,username, email, password})

        const user = await User.findOne({surname}).lean()

        id = user._id.toString()

    })

    it('Should to authenticate user if they are incorrect data', () => {
        expect(()=> logic.authenticateUser(1,password)).to.throw(Error, '1 is not a string')
        expect(()=> logic.authenticateUser(username,1)).to.throw(Error, '1 is not a string')
    })

    it('Should to authenticate user on correct credentials', async () => {debugger
        const userId = await logic.authenticateUser(username, password)
        expect(userId).to.equal(id)
    })    
    

    it('Should to authenticate user if it is incorrect username', () => {
        username = "John Doe"

        try{
            logic.authenticateUser(username,password)
        }catch(error){
            expect(error.message).to.equal(`Username with ${username} does not exists`)
        }
    })

    it('Should to authenticate user if it is incorrect password', () => {
        username = "576rhfbe"

        try{
            logic.authenticateUser(username,password)
        }catch(error){
            expect(error.message).to.equal(`Wrong Credentials`)
        }
    })


    after(()=> User.deleteMany().then(database.disconnect))
})