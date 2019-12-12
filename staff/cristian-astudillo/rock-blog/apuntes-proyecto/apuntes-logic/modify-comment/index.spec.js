// ROCK-API/LOGIC/MODIFY-COMMENT/INDEX.SPEC.JS : REALIZA EL TESTING PARA EVITAR ERRORES UNA VEZ EJECUTADO EL PROYECTO.

require('dotenv').config()//Para guardar secretos
const { env: { TEST_DB_URL } } = process// conectar/desconectar la base de datos
const { expect } = require('chai')//Para poder ejecutar el test
const logic = require('../index')//Ruta del index.js
const { database, ObjectId, models: { User, Comment } } = require('rock-data')//Modelo "USER", "COMMENT"

//Agrupa los "IT", se utiliza para agrupar los tests o suite de tests.
//Permite crear nuestro mundo 
describe('Logic - Modify Comment', () => {

     //La función dentro de before se va a ejecutar antes del primer test dentro del describe
    before(() => database.connect(TEST_DB_URL))

    //Se declaran las variables
    let id, name, surname, username, email, password, message, date

    //la función dentro de beforeEach se va a ejecutar antes de cada test dentro del describe
    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`

        //Se usa Promise.all()
        await Promise.all([User.deleteMany(), Comment.deleteMany()])

        const user = await User.create({ name, surname, username, email, password })        
        id = user.id      
        
        
        message = `message-${Math.random()}`
        owner = `owner-${Math.random()}`
        
        
        const comment = await Comment.create({ message, owner:ObjectId(id), date:new Date })
        id_comment = comment.id
        
    })

    //it : son las casos a testear.
    it('Should to modify user if they are incorrect dates', () => {
        expect(() => logic.modifyComment(1,message)).to.throw(Error, '1 is not a string')
        expect(() => logic.modifyComment(id, 1)).to.throw(Error, '1 is not a string')
    })

    it('Should to modify comment if the id is incorrect', async () => {
        const id = '5debbfba23be5a63d0f0b927'
     
        try {
            await logic.modifyComment(id, message)
        } catch(error) {
            expect(error.message).to.equal(`User with id ${id} does not exists`)
        }
    })

    //La función dentro de after se va a ejecutar después del último test dentro del describe
    //DeleteMany() limpia el usuario creado (User.create) y comentario creado(Comment.deleteMany) con un Promise.all(),  y luego el then() nos desconecta de la base de datos
    after(() => Promise.all([User.deleteMany(), Comment.deleteMany()]).then(database.disconnect))

})