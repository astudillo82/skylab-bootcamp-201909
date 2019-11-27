const { Schema } = require('mongoose')
const { validators : { isEmail }} = require('tasks - util')
const Post = require('./post')

module.exports = new Schema({
        name: {
            type: String,
            require: true
        }, 

        surname: {
            type: String,
            required: true
        },

        username: {
            type: String,
            required: true,
            unique: true
        },

        email: {
            type: String,
            required: true,
            match: isEmail
        },

        password: {
            type: String,
            required: true,            
        },
        posts : [Post]
    })












