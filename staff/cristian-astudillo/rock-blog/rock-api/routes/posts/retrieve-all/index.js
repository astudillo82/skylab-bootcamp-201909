const logic = require('../../../logic')

module.exports = async (req,res) => {
    try {
        const { params:{ id } } = req  
        const user  = await logic.retrieveAllPosts(id)       
        res.status(201).json({ message: 'User has been retrieved correctly', user })        
    } catch {
        res.status(400).json({ error })
    }
}