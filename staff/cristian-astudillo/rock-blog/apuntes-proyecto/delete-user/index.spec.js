// ROCK-API/LOGIC/REGISTER-USER/INDEX.SPEC.JS :  REALIZA EL TESTING PARA EVITAR ERRORES UNA VEZ EJECUTADO EL PROYECTO.

require('dotenv').config()//Para guardar secretos
const { env : { TEST_DB_URL } } = process//conectar/desconectar la base de datos
const { expect } = require('chai')//Para poder ejecutar el test
const logic = require('../')//Ruta del index.js
const { database, models: { User } } = require('rock-data')//Modelo "USER"

//Agrupa los "IT", se utiliza para agrupar los tests o suite de tests.
//Permite crear nuestro mundo 
describe('Logic - Delete User', () => { 

//La función dentro de before se va a ejecutar antes del primer test dentro del describe
before(() => database.connect(TEST_DB_URL))

 //Se declaran las variables
let id, name, surname, username, email, password

//la función dentro de beforeEach se va a ejecutar antes de cada test dentro del describe
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
  //la función dentro de beforeEach se va a ejecutar antes de cada test dentro del describe
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

    //La función dentro de after se va a ejecutar después del último test dentro del describe
    //DeleteMany() limpia el usuario creado (User.create) y luego el then() nos desconecta de la base de datos.
    after(()=>User.deleteMany().then(database.disconnect))
})



