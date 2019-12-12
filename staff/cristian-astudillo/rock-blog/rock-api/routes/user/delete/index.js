const logic = require('../../../logic')

module.exports = async (req,res) => {
    try {
        const { params:{ id } } = req       
        await logic.deleteUser(id);
        res.status(201).json({ message:' The user was TERMINATED...'})
        

    } catch {
        res.status(400).json({ error })
    }
}