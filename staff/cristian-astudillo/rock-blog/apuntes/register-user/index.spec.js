// ROCK-API/LOGIC/REGISTER-USER/INDEX.SPEC.JS :  REALIZA EL TESTING PARA EVITAR ERRORES UNA VEZ EJECUTADO EL PROYECTO.

require('dotenv').config()//Para guardar secretos
const { env: { TEST_DB_URL } } = process // conectar/desconectar la base de datos
const { expect } = require('chai')//Para poder ejecutar el test
const logic = require('../')//Ruta del index.js
const { database, models: { User } } = require('rock-data')//Modelo "USER"

//Agrupa los "IT", se utiliza para agrupar los tests o suite de tests.
//Permite crear nuestro mundo
describe('Logic - Register User', () => {

    //La función dentro de before se va a ejecutar antes del primer test dentro del describe
    before(() => database.connect(TEST_DB_URL))
    
    //Se declaran las variables
    let name, surname, email, username, password

    //la función dentro de beforeEach se va a ejecutar antes de cada test dentro del describe
    beforeEach(() => {
        //Math.random()???
        name = `name-${Math.random()}`        
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        username = `username-${Math.random()}`
        password = `password-${Math.random()}`
    })

    //it : son las casos a testear.
    it('Should to register on correct credentials', async () => {
        
        const noResponse = await logic.registerUser(name, surname, email, username, password)        
        expect(noResponse).to.be.undefined

        const user = await User.findOne({ email, username }).lean()/*email,password ????????? */

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

    //La función dentro de after se va a ejecutar después del último test dentro del describe
    //DeleteMany() limpia el usuario creado (User.create) y luego el then() nos desconecta de la base de datos.
    after(() => User.deleteMany().then(database.disconnect))

})