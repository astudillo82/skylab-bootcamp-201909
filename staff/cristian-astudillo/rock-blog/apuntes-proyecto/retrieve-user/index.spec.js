// ROCK-API/LOGIC/RETRIEVE-USER/INDEX.SPEC.JS :  REALIZA EL TESTING PARA EVITAR ERRORES UNA VEZ EJECUTADO EL PROYECTO.

require('dotenv').config() //Para guardar secretos
const { env: { TEST_DB_URL } } = process// conectar/desconectar la base de datos
const { expect } = require('chai')//Para poder ejecutar el test
const  logic  = require('../')//Ruta del index.js
const { database, models: { User } } = require('rock-data')//Modelo "USER"

//Agrupa los "IT", se utiliza para agrupar los tests o suite de tests.
//Permite crear nuestro mundo
 describe('Logic - Retrieve User', () => {
   

    //before() : La función dentro de before se va a ejecutar ANTES del primer test dentro del describe.
    //Conecta a la Base de Datos
     before(() => database.connect(TEST_DB_URL))

    //Declaramos variable globales incluso el ID para luego utilizarlo en el logic.retrieveUser(id)
    let id, name, surname, username, email, password    

    //beforeEach() : La función dentro de beforeEach se va a ejecutar ANTES de cada test dentro del describe. 
     beforeEach(async () => {       
        name = `name - ${Math.random()}`
        surname = `surname - ${Math.random()}`
        username = `username - ${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`        

        // Se usa create()para guardar uno o más documentos en la Base de Datos       
        user = await User.create({name, surname, username, email, password})
        
        id = user.id        

    })

    it('Should to retrieve user if they are correct data', async () => {
        
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
        expect(user.posts).to.be.an('array').that.is.empty//????EMBED??
    })


  
    it('Should to retrieve user if it is incorrect ID', async () => {
       const id =  '5de4e692f53ec15feb3774b5'        
        try {
            user = await logic.retrieveUser(id)
        } catch (error) {
            expect(error.message).to.equal(`User with id ${id} does not exist`)
        }
    })
    
    // Una vez que nos pase el test, deleteMany nos permite limpiar el usuario creado (User.create) y luego (then()) nos desconecta, sino seguirá ejecutándose o "runeando"
    after(() => User.deleteMany().then(database.disconnect))
 })
