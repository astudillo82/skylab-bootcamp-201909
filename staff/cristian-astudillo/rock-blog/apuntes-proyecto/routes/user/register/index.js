const logic = require('../../../logic')

/* router.post('/', jsonBodyParser,(req, res) => {
    const { body: { name, surname, email, username, password } } = req

    try {
        logic.registerUser(name, surname, email, username, password)
        res.status(201).end()
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}) */

module.exports = async(req, res) => {
    const { body: { name, surname, username, email, password } } = req

    try {
        //Al ser una función, los parámetros deben de estar escritos en la misma posición que en "register-user/index.js"
        logic.registerUser(name, surname, username, email, password)
        res.status(201).json({ message: 'user correctly registered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}
