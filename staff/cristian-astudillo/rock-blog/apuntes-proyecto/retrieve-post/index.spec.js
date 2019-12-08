// ROCK-API/LOGIC/RETRIEVE-POST/INDEX.SPEC.JS : REALIZA EL TESTING PARA EVITAR ERRORES UNA VEZ EJECUTADO EL PROYECTO.

require('dotenv').config() //Para guardar secretos
const { env: { TEST_DB_URL } } = process//Para guardar secretos
const { expect } = require('chai')//Para poder ejecutar el test
const  logic  = require('..')//Ruta del index.js
const { polyfills: { arrayRandom } } = require('rock-util')//POLYFILL : Para poder hacer el random en el testing
const { database, ObjectId, models: { User, Post} } = require('rock-data')//Modelo "USER","POST"

arrayRandom()

//Agrupa los "IT", se utiliza para agrupar los tests o suite de tests.
//Permite crear nuestro mundo 
describe('Logic - Retrieve Post', () => {

    //La función dentro de before se va a ejecutar antes del primer test dentro del describe
    before (() => database.connect(TEST_DB_URL))

    //Se declaran las variables
    let id, name, surname, username, email,password, post_ids, title, description

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

        const insertion = []
        
        for (let i = 0; i < 10; i++) {
            const posts = {               
                title: `title-${Math.random()}`,
                description: `description-${Math.random()}`,
                owner : ObjectId(id)               
            } 

            insertion.push(Post.create(posts).then(post => post_ids.push(post.id)))

            title.push(posts.title)
            description.push(posts.description)
            owner.push(posts.owner)            
        }

        for (let i = 0; i < 10; i++) {
            insertion.push(Post.create({               
                title: `title-${Math.random()}`,
                description: `description-${Math.random()}`,
                owner : ObjectId()
            }))
        } 
         //Se usa Promise.all()       
        await Promise.all(insertion)
    })

     //it : son las casos a testear.
    it('should to get correct user and post data', async() => {

        //random(): invoa el array-random.js desde el polyfill
        const postId = post_ids.random()

        const response = await logic.retrievePost(id, postId)
        expect(response).to.not.exist

     
        const post = await Post.findById(id)
        expect(post).to.not.exist        
        
    })

    it('Should to fail or unexisting user and correct post data', async () => {
        const id = ObjectId().toString()

        //random(): invoa el array-random.js desde el polyfill
        const postId = post_ids.random()

        try {
            await logic.retrievePost(id,postId)           
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with id ${id} does not exists`)
        }

    })

    it('Should to fail on correct user and unexisting post data', async () => {
        const postId = ObjectId().toString()
        
        try {
            await logic.retrievePost(id,postId)            

            
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with id ${id} does not match to post with id ${postId}`)
        }

    })
 
    it('Should to fail on correct user and wrong post data', async () => {
        const postId = ObjectId().toString()
        
        try {
            await logic.retrievePost(id,postId)                       
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with id ${id} does not match to post with id ${postId}`)
        }

    })

    //La función dentro de after se va a ejecutar después del último test dentro del describe
    //DeleteMany() limpia el usuario creado (User.create) y post creado(Post.deleteMany) con un Promise.all(),  y luego el then() nos desconecta de la base de datos
    after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(database.disconnect))
})

