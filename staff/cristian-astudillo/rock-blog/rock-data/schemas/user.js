const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({ 
        name: {
            type: String,
            require: [true, 'please, complete the field']
        }, 

        surname: {
            type: String,
            required: [true, 'please, complete the field']
        },

        username: {
            type: String,
            required: [true, 'please, complete the field'],
            unique: true
        },

        email: {
            type: String,
            required: [true, 'please, complete the field'],
            match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },

        password: {
            type: String,
            required: [true, 'please, complete the field'] ,           
        },
        
        posts : {
            type: [ObjectId],
            ref: 'Post'
        }
    })












