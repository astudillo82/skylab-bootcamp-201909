// ROCK-API/LOGIC/RETRIEVE-USER/INDEX.SPEC.JS :  REALIZA EL TESTING PARA EVITAR ERRORES UNA VEZ EJECUTADO EL PROYECTO.

require('dotenv').config() //Para guardar secretos
const { env: { TEST_DB_URL } } = process// conectar/desconectar la base de datos
const { expect } = require('chai')//Para poder ejecutar el test
const  logic  = require('../')//Ruta del index.js
const { database, models: { User } } = require('rock-data')//Modelo "USER"

//Agrupa los "IT", se utiliza para agrupar los tests o suite de tests.
//Permite crear nuestro mundo
describe('Logic - Update User', () => {

//before() : La función dentro de before se va a ejecutar ANTES del primer test dentro del describe.
//Conecta a la Base de Datos
before (() => database.connect(TEST_DB_URL))

//Declaramos las variables
let id, update, name, surname, email, username, password


    //beforeEach() : La función dentro de beforeEach se va a ejecutar ANTES de cada test dentro del describe.  
    beforeEach(async () => {
        await User.deleteMany()

        update = {
            name : 'Cristian',
            surname: 'Astudillo'
        } 
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        username = `username-${Math.random()}`
        password = `password-${Math.random()}`

        await User.create({ name, surname, email, username, password })  

        const user = await User.findOne({email})  //email, surname, ...???     

        id = user._id.toString()
        
    })

    it('Should to update user if they are incorrect dates', () => {
        expect(() => logic.updateUser(1, update)).to.throw(Error,'1 is not a string')
        expect(() => logic.updateUser(id, 1)).to.throw(Error,'1 is not an object')              
    })


    //????
    it('Should to update user on correct credentials', async () => {
        //llamamos a la lógica que nos actualiza el usuario
        await logic.updateUser(id, update)        
        const user = await User.findOne({_id:id})  

        expect(user.name).to.equal(update.name)

    })

    it('Should to update user if it is incorrect username', async () => {
        username = 'johnDoe'

        try {
            await logic.updateUser(id, update)

        } catch (error) {
            expect(error.message).to.equal(`User with id ${id} does not exist`)
        }
    })

    //La función dentro de after se va a ejecutar después del último test dentro del describe
    //DeleteMany() limpia el usuario creado (User.create) y luego el then() nos desconecta de la base de datos.
    after(() => User.deleteMany().then(database.disconnect))

})