const logic = require('../../../logic')

module.exports = async(req,res) => {
    try {
        const { id, body : { name, surname } } = req
        await logic.updateUser(id, { name, surname })           
     
        res.status(201).json({ message:'User was able to update their data'})

    } catch ({ message }) {
        res.status(400).json({ error: message })        
    }    
}