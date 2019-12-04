const { Schema } = require('mongoose')

module.exports = new Schema({
    message: {
        type: String
    },

    owner: {
        type: ObjectId,
        ref: 'user'
    },
    
    date: {
        type: Date
    }
})