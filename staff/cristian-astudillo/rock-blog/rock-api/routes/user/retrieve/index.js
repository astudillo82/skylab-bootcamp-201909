const logic = require('../../../logic')

module.exports = (req,res) => {debugger
    try {
        const { id } = req
        logic.retrieveUser(id)
        res.json(user)

    } catch {
        res.status(400).json({ message })
    }
}