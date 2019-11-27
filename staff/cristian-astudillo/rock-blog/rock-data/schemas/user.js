const { Schema } = require('mongoose')
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
            match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },

        password: {
            type: String,
            required: true,            
        },
        posts : [Post]
    })












