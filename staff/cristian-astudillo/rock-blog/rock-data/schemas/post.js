const { Schema } = require('mongoose')

module.exports = new Schema({
    title: {
        type: String,
        require : true    
    },

    description: {
        type: String,
        required:true
    }
})