// ROCK-API/LOGIC/CREATE-POST/INDEX.SPEC.JS : REALIZA EL TESTING PARA EVITAR ERRORES UNA VEZ EJECUTADO EL PROYECTO.

require('dotenv').config() //Para guardar secretos
const { env : { TEST_DB_URL } } = process //conectar/desconectar la base de datos
const { expect } = require('chai') //Para poder ejecutar el test
const logic = require('../')//Ruta del index.js
const { database, models: { User, Post, Comment } } = require('rock-data')//Modelo "USER", "POST", "COMMENT"

//Agrupa los "IT", se utiliza para agrupar los tests o suite de tests.
//Permite crear nuestro mundo 
describe('Logic - Delete Post', () => {

//La función dentro de before se va a ejecutar antes del primer test dentro del describe
before(() => database.connect(TEST_DB_URL))

 //Se declaran las variables
let id, name, surname, username, email, password, description, date

//la función dentro de beforeEach se va a ejecutar antes de cada test dentro del describe
beforeEach(async () => {

    description = 'Everything'

    name = `name-${Math.random()}`
    surname = `surname-${Math.random()}`
    username = `username-${Math.random()}`
    email = `email-${Math.random()}@email.com`
    password = `password-${Math.random()}`

    //Se usa Promise.all()
    await Promise.all([User.deleteMany(), Post.deleteMany()])

    const user = await User.create({ name, surname, username, email, password })
    id = user.id

    title = `title-${Math.random()}`
    description = `description-${Math.random()}`
    owner = `owner-${Math.random()}`
    date = `date-${Math.random()}`

    message = `message-${Math.random()}`
    owner = `owner-${Math.random()}`
    date = `date-${Math.random()}`

    const comment = new Comment({ message, owner:id, date })
    
    const post = await Post.create({ title, description, owner:id, date, comments:[comment] })

    id = post.id

})

//it : son las casos a testear.
it('Should to delete user if they are incorrect dates', () => {
    expect(() => logic.deletePost(1)).to.throw(Error, '1 is not a string')  
})


it('Should to delete post if the id is incorrect', async () => {
    const id = '5de4e692f53ec15feb3774b5'

    try {
        await logic.deletePost(id)
    } catch(error) {
        expect(error.message).to.equal(`User with id ${id} does not exists`)
    }
})

 //La función dentro de after se va a ejecutar después del último test dentro del describe
//DeleteMany() limpia el usuario creado (User.create) y post creado(Post.deleteMany) con un Promise.all(),  y luego el then() nos desconecta de la base de datos.
after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(database.disconnect))

})