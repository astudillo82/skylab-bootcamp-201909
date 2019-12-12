require('dotenv').config()
const { env : { TEST_DB_URL } } = process
const { expect } = require('chai')
const logic = require('../')
const { database, models: { User } } = require('rock-data')

describe('Logic - Delete User', () => { 

before(() => database.connect(TEST_DB_URL))

let id, name, surname, username, email, password

    beforeEach(async () => {     
        name = `cristian-${Math.random()}`
        surname = `surmane-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password  =`password-${Math.random()}`
        
        await User.create({name, surname, email, username, password})
        const user = await User.findOne({email})
        id = user._id.toString()            
    })


    it('Should to delete user if they are incorrect dates', () => {
        expect(() => logic.deleteUser(1)).to.throw(Error,'1 is not a string')     
    })

    it('Should to delete user if it is incorrect username', async () => {
        username = 'johnDoe'

        try {
            await logic.deleteUser(id)

        }catch(error){
            expect(error.message).to.equal(`User with id ${id} does not exists`)
        }
    })

    after(()=>User.deleteMany().then(database.disconnect))

})



