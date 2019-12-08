const logic = require('../../../logic')
const bodyParser = require('body-parser')
// const { jsonBodyParser } = require ('../../../routes/index')
const { Router } = require('express')
const jsonBodyParser = bodyParser.json()


const router = Router()

router.post('/', jsonBodyParser,(req, res) => {
    debugger
    const { body: { name, surname, email, username, password } } = req

    try {
        logic.registerUser(name, surname, email, username, password)
        res.status(201).end()
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

module.exports = router