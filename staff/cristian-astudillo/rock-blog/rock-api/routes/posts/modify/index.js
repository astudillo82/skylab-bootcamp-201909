const logic = require('../../../logic')

module.exports = async(req,res) => {    
    try {
        const {id, body: { owner, title, description } } = req
        await logic.modifyPost(id, {owner, title, description})
        
        res.status(201).json({ message :'Post was modify correctly'})
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}







