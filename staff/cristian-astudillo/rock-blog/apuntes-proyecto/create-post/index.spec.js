// ROCK-API/LOGIC/CREATE-POST/INDEX.SPEC.JS : REALIZA EL TESTING PARA EVITAR ERRORES UNA VEZ EJECUTADO EL PROYECTO.

require('dotenv').config() //Para guardar secretos
const { env: { TEST_DB_URL } } = process //conectar/desconectar la base de datos
const { expect } = require('chai') //Para poder ejecutar el test
const logic = require('../index')//Ruta del index.js
const { database, models: { User, Post } } = require('rock-data')//Modelo "USER", "POST"

//Agrupa los "IT", se utiliza para agrupar los tests o suite de tests.
//Permite crear nuestro mundo
describe('Logic - Create Post', () => { 

    //La función dentro de before se va a ejecutar antes del primer test dentro del describe
    before(()=> database.connect(TEST_DB_URL))

     //Se declaran las variables
    let id, name, surname, username, email, password, title, description

    //la función dentro de beforeEach se va a ejecutar antes de cada test dentro del describe
    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `pasword-${Math.random()}`

        // Se usa Promise.all()
        await Promise.all([User.deleteMany(), Post.deleteMany()])

        const user = await User.create({name, surname, username, email, password})

        id = user.id    

        title = `title-${Math.random()}`
        description = `description-${Math.random()}`

    })      
    
     //it : son las casos a testear.
    it ('Should to create post if they are incorrect data', () => {         
        expect(()=> logic.createPost(1,password)).to.throw(Error, '1 is not a string')
        expect(()=> logic.createPost(username,1)).to.throw(Error, '1 is not a string')
    })


    it ('should to get correct user and post data', async () => { 
        const postId = await logic.createPost(id,title,description)
         
        expect(postId).to.exist
        expect(postId).to.be.a('string')
        expect(postId).to.have.length.greaterThan(0)

        const post = await Post.findById(postId)

        expect(post).to.exist
        expect(post.id).to.equal(postId)
        expect(post.title).to.equal(title)
        expect(post.description).to.equal(description)

    })

     //La función dentro de after se va a ejecutar después del último test dentro del describe
     //DeleteMany() limpia el usuario creado (User.create) y comentario creado(Comment.deleteMany) con un Promise.all(),  y luego el then() nos desconecta de la base de datos.
    after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(database.disconnect))

})