require('dotenv').config()
const { env : { TEST_DB_URL } } = process
const { expect } = require ('chai')
const logic = require('../')
const { database, models : { User } } = require ('rock-data')

describe('Logic - Update User', () => {

    before (() => database.connect(TEST_DB_URL))

    let name, surname, username, email, password, id
    
    beforeEach(async () => {       
        
        update = {
            name:'Cristian',
            surname: 'Astudillo'
        }
        
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`

        await User.create({name, surname, username, email, password})

        const user = await User.findOne({email})

        id = user._id.toString()
    })

    it('Should to update user if they are incorrect dates', () => { 
        expect(() => logic.updateUser(1, update)).to.throw(Error,'1 is not a string')
        expect(() => logic.updateUser(id, 1)).to.throw(Error,'1 is not an object')
    })

    it('Should to update user if the username is incorrect', async () => {
        username = 'John Doe'

        try{
            await logic.updateUser(id, update)

        } catch(error){
            expect(error.message).to.equal(`User with id ${id} does not exists`)
        }
    })
    
    after(() => User.deleteMany().then(database.disconnect))

})


