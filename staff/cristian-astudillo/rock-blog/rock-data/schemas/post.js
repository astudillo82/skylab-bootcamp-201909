const { Schema, ObjectId } = require('mongoose')
const Comment = require('./comment')

module.exports = new Schema({
    title: {
        type: String,
        require : true    
    },

    description: {
        type: String,
        required:true
    },

    owner: {
        type: ObjectId,
        ref: 'User'
    },

    comments: [Comment]
})