 const logic = require('../../../logic')

const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process

module.exports = async (req,res) => {
    const { body : { username, password } } = req

    try {
        const id = await logic.authenticateUser(username, password)           
        const token = jwt.sign({ sub: id }, SECRET, { expiresIn: '1d' })
        res.json({ message:'User correctly authenticated', id,token })

    } catch ({ message }) {
        res.status(400).json({ error })        
    }
}