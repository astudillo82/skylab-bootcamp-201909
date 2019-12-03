// ROCK-API/LOGIC/REGISTER-USER/INDEX.SPEC.JS :  REALIZA EL TESTING PARA EVITAR ERRORES UNA VEZ EJECUTADO EL PROYECTO.
require('dotenv').config() 
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const  logic  = require('../')
const { database, models: { User } } = require('rock-data')


 describe('Logic - Retrieve User', () => {
    //TODO: before() primero hacemos la conexión

    //before(), la función dentro de before se va a ejecutar antes del primer test dentro del describe.
     before(() => database.connect(TEST_DB_URL))

    // TODO declaramos variable globales incluso el ID para luego utilizarlo en el logic.retrieveUser(id)
     let id, name, surname, username, email, password

    // TODO: beforeEach() registramos a un user (User.create())

    //beforeEach(), la función dentro de beforeEach se va a ejecutar antes de cada test dentro del describe.
     beforeEach(async () => {
        
        name = `name - ${Math.random()}`
        surname = `surname - ${Math.random()}`
        username = `username - ${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        

        user = await User.create({name, surname, username, email, password})
        
        id = user.id
        

    })

    it('Should to retrieve user if they are correct data', async() => {
        
        const user =  await logic.retrieveUser(id)

        expect(user).to.exist
        expect(user.id).to.equal(id)   
        expect(user.name).to.equal(name)
        expect(user.name).to.be.a('string')
        expect(user.surname).to.equal(surname)
        expect(user.surname).to.be.a('string')
        expect(user.email).to.equal(email)
        expect(user.email).to.be.a('string')
        expect(user.username).to.equal(username)
        expect(user.username).to.be.a('string')
        expect(user.posts).to.be.an('array').that.is.empty
    })


    // TODO: it() handle error validate? ...
    it('Should to retrieve user if it is incorrect ID', async () => {
       const id =  '5de4e692f53ec15feb3774b5'        
        try {
            user = await logic.retrieveUser(id)
        } catch (error) {
            expect(error.message).to.equal(`User with id ${id} does not exist`)
        }
    })

    // TODO: it() validar si el retrieve user hace su función. Objetivo del retrieve: que devuelva el user: { name, surname, email, username } a través del ID


    //TODO: after() por último, limpiamos BBDD y desconectamos

    // Una vez que nos pase el test, deleteMany nos permite limpiar el usuario creado (User.create) y luego (then()) nos desconecta, sino seguirá ejecutándose o "runeando"
    after(() => User.deleteMany().then(database.disconnect))
 })
