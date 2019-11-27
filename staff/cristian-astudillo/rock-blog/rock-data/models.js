const { model } = require('mongoose')
const { user, post } = require('./schemas')

module.exports = {
    User: model('User', user),
    Post: model('Post', post)
}