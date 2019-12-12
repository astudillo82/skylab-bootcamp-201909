const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
    message: {
        type: String
    },

    owner: {
        type: ObjectId,
        ref: 'User'
    },
    
    date: {
        type: Date
    }
})