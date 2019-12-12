const { model } = require('mongoose')
const { user, post, comment } = require('./schemas')

module.exports = {
    User: model('User', user),
    Post: model('Post', post), 
    Comment: model('Comment', comment)
}