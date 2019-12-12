// ROCK-API/LOGIC/RETRIEVE-ALL-POSTS/INDEX.SPEC.JS : REALIZA EL TESTING PARA EVITAR ERRORES UNA VEZ EJECUTADO EL PROYECTO.

require('dotenv').config() //Para guardar secretos
const { env: { TEST_DB_URL } } = process//Para guardar secretos
const { expect } = require('chai')//Para poder ejecutar el test
const  logic  = require('..')//Ruta del index.js
const { database, ObjectId, models: { User, Post} } = require('rock-data')//Modelo "USER","POST"


//Agrupa los "IT", se utiliza para agrupar los tests o suite de tests.
//Permite crear nuestro mundo 
describe('Logic - Retrieve All Posts', () =>{

    //La función dentro de before se va a ejecutar antes del primer test dentro del describe
    before (() => database.connect(TEST_DB_URL))

     //Se declaran las variables
    let id, name, surname, username, email, password, title, description

    //la función dentro de beforeEach se va a ejecutar antes de cada test dentro del describe
    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `pasword-${Math.random()}`

        //Se usa Promise.all()
        await Promise.all([User.deleteMany(), Post.deleteMany()])

        const user = await User.create({name, surname, username, email, password})
        id = user.id  

        post_ids = []
        title = []
        description = []
        owner = []

        const insertions = []

        for (let i = 0; i < 10; i++) {
            const posts = {               
                title: `title-${Math.random()}`,
                description: `description-${Math.random()}`,
                owner : ObjectId(id)               
            }    

            insertions.push(Post.create(posts).then(post => post_ids.push(post.id)))

            title.push(posts.title)
            description.push(posts.description)
            owner.push(posts.owner)
        }

        for (let i = 0; i < 10; i++) {
            insertions.push(Post.create({               
                title: `title-${Math.random()}`,
                description: `description-${Math.random()}`,
                owner : ObjectId()
            }))
        }
        
        //Se usa Promise.all()
        await Promise.all(insertions)

    })

     //it : son las casos a testear.
    it(`should to get correct user and posts data`, async() => {
        const posts = await logic.retrieveAllPosts(id)        
        expect(posts).to.exist
        expect(posts).to.have.lengthOf(10)
        
        posts.forEach(post => {
            expect(post.id).to.exist
            expect(post.id).to.be.a('string')
            expect(post.id).to.have.length.greaterThan(0)   

            expect(post.owner).to.equal(id)

            expect(post.title).to.exist
            expect(post.title).to.be.a('string')
            expect(post.title).to.have.length.greaterThan(0)    

            expect(post.description).to.exist
            expect(post.description).to.be.a('string')
            expect(post.description).to.have.length.greaterThan(0) 
        })
    })   
    
    //La función dentro de after se va a ejecutar después del último test dentro del describe
    //DeleteMany() limpia el usuario creado (User.create) y post creado(Post.deleteMany) con un Promise.all(),  y luego el then() nos desconecta de la base de datos
    after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(database.disconnect))

})
