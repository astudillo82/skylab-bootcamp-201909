const logic = require('../../../logic')
const { router, jsonBodyParser} = require ('../../../routes/index')


router.post('/', jsonBodyParser,(req, res) => {
    const { body: { name, surname, email, username, password } } = req

    try {
        logic.registerUser(name, surname, email, username, password)
        res.status(201).end()
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

