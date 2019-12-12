const logic = require('../../../logic')

module.exports = async (req,res) => {
    const { body: { message, owner, date } } = req
    
    try {
        await logic.createComment(message, owner, date)
        res.status(201).json({ message :'Message was created correctly'})
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}