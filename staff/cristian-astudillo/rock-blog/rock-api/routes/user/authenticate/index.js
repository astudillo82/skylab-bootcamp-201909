const logic = require('../../../logic')

module.exports = (req,res) => {
    const { body : { username, password } } = req

    try {
        logic.authenticateUser(username,password)           
        const token = jwt.sign({ sub: id }, SECRET, { expiresIn: '1d' })
        res.json({ token })

    } catch ({ message }) {
        res.status(400).json({ message })        
    }
}