const { Schema } = require('mongoose')
// const { validators : { isEmail } ???} = require('taks - util')
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

        password: {
            type: String,
            required: true,            
        },
        post : [Post]
    })












