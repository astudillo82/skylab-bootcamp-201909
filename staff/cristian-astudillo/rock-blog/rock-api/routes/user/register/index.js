const logic = require('../../../logic')

module.exports = (req, res) => {
    const { body: { name, surname, email, username, password } } = req

    try {
        logic.registerUser(name, surname, email, username, password)
        res.status(201).end()
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}