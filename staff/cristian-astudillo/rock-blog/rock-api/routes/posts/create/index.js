const logic = require('../../../logic')

module.exports = async(req,res) => {   
    const { body: {owner, title, description } } = req
    
    try {
        await logic.createPost(owner, title, description)
        res.status(201).json({ message :'Post was created correctly'})
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}


