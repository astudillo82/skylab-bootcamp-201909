// ROCK-API/LOGIC/CREATE-COMMENT/INDEX.SPEC.JS : REALIZA EL TESTING PARA EVITAR ERRORES UNA VEZ EJECUTADO EL PROYECTO.

require('dotenv').config()//Para guardar secretos
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')//Para poder ejecutar el test
const logic = require('../index')//Ruta del index.js
const { database, models: { User, Comment } } = require('rock-data')//Modelo "USER", "COMMENT"

//Agrupa los "IT", se utiliza para agrupar los tests o suite de tests.
//Permite crear nuestro mundo
describe('Logic - Create Comment', () => {

    //La función dentro de before se va a ejecutar antes del primer test dentro del describe
    before (()=> database.connect(TEST_DB_URL)) 

    //Se declaran las variables
    let id, name, surname, username, email, password, message, date

    //la función dentro de beforeEach se va a ejecutar antes de cada test dentro del describe
    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `pasword-${Math.random()}`
        
        // Se usa Promise.all()
        await Promise.all([User.deleteMany(), Comment.deleteMany()])

        const user = await User.create({name, surname, username, email, password})        
        id = user.id
        
        
        message = `message-${Math.random()}`
        owner = `owner-${Math.random()}`      
       
        const comment = Comment.create({ message, owner:id, date:new Date })
        id_comment = comment.id 
       
    })

     //it : son las casos a testear.
    it('Should to create comment if it is correct data', () => {
        expect(()=> logic.createComment(1, password)).to.throw(Error, '1 is not a string')
        expect(()=> logic.createComment(username, 1)).to.throw(Error, '1 is not a string')
    })

    it ('should to get correct user and comment data', async () => { 
        const commentId = await logic.createComment(id,message)
         
        expect(commentId).to.exist
        expect(commentId).to.be.a('string')
        expect(commentId).to.have.length.greaterThan(0)

        const comment = await Comment.findById(commentId)

        expect(comment).to.exist
        expect(comment.id).to.equal(commentId)
        expect(comment.message).to.equal(message)      

    })

     //La función dentro de after se va a ejecutar después del último test dentro del describe
     //DeleteMany() limpia el usuario creado (User.create) y cometario creado(Comment.deleteMany) con un Promise.all(),  y luego el then() nos desconecta de la base de datos.
    after(() => Promise.all([User.deleteMany(), Comment.deleteMany()]).then(database.disconnect))

}) 