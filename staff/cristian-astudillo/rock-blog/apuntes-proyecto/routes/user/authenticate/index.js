const logic = require('../../../logic')

module.exports = async (req,res) => {
    const { body : { username, password } } = req

    try {
        logic.authenticateUser(username, password)           
        const token = jwt.sign({ sub: id }, SECRET, { expiresIn: '1d' })
        res.json({ message:'user correctly authenticated', id,token })

    } catch ({ message }) {
        res.status(400).json({ error: message })        
    }
}