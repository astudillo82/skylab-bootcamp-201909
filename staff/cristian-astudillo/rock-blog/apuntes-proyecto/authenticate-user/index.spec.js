// ROCK-API/LOGIC/AUTHENTICATE-USER/INDEX.SPEC.JS :  REALIZA EL TESTING PARA EVITAR ERRORES UNA VEZ EJECUTADO EL PROYECTO.

require('dotenv').config()//Para guardar secretos(passwords, etc..)
const { env: { TEST_DB_URL } } = process// conectar/desconectar la base de datos
const { expect } = require('chai')//Para poder ejecutar el test
const logic = require('../index')//Ruta del index.js
const { database, models: { User } } = require('rock-data')//Modelo "USER"


//Agrupa los "IT", se utiliza para agrupar los tests o suite de tests.
//Permite crear nuestro mundo
describe('Logic - Authenticate User', () => {

    //before() : La función dentro de before se va a ejecutar ANTES del primer test dentro del describe.
    //Conecta a la Base de Datos
    before(() => database.connect(TEST_DB_URL))

    //Se Declaran las variables 
    let name, surname, email, username, password, id

    //beforeEach() : La función dentro de beforeEach se va a ejecutar ANTES de cada test dentro del describe.    
    beforeEach(async () => {

        // Se usa deleteMany() para limpiar las coincidencias(arriba o abajo??)
        await User.deleteMany()
        
        //Math.random()???
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        username = `username-${Math.random()}`
        password = `password-${Math.random()}`
        
        // Se usa create()para guardar uno o más documentos en la Base de Datos
        await User.create({ name, surname, email, username, password })

            //Luego, se guarda en una constante "user"
            //findOne(): ????
            //lean(): método de mongoose que convierte  de mongoObject a Object
            //en el findOne()puede ser cualquier variable(name, surname, etc...), pero se busca por 'email' ya que un usuario puede tener un mismo nombre, pero no un mismo email 
            const user = await User.findOne({email}).lean()

            //_id : Se usa toString() ya que cuando se crea un esquema en mongo, por defecto genera un _id en un objecto, por lo tanto, lo convierte en un string
            id = user._id.toString()
    })

    // it : son las casos a testear.
    it('Should to authenticate user if they are incorrect data', () => {
        expect(() => logic.authenticateUser(1, password)).to.throw(Error,'1 is not a string')
        expect(() => logic.authenticateUser(username, 1)).to.throw(Error,'1 is not a string')    
    })

    it('Should to authenticate user on correct credentials', async () => {
        const userId = await logic.authenticateUser(username, password)
        expect(userId).to.equal(id)
    })

    it('Should to authenticate user if it is incorrect username', async () => {
        username = 'johnDoe'

        try {
            await logic.authenticateUser(username, password)
        } catch (error) {
            expect(error.message).to.equal(`User with username ${username} does not exist`)
        }
    })

    it('Should to authenticate user if it is incorrect password', async () => {
        password = 'johnDoe'

        try {
            await logic.authenticateUser(username, password)
        } catch (error) {
            expect(error.message).to.equal(`Wrong credentials`)
        }
    })

    //La función dentro de after se va a ejecutar después del último test dentro del describe
    //DeleteMany() limpia el usuario creado (User.create) y luego el then() nos desconecta de la base de datos.
    after(() => User.deleteMany().then(database.disconnect))
})