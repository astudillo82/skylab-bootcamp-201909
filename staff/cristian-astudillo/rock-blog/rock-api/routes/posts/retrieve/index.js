const logic = require('../../../logic')

module.exports = async (req,res) => {
    try {
        const { params:{ id } } = req  
        const user = await logic.retrievePost(id)       
        res.status(201).json({ message: 'User has been able to retrieve post correctly', user })        
    } catch {
        res.status(400).json({ error })
    }
}