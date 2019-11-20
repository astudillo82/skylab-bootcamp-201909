const validate = require('../../utils/validate')
const users = require('../../data/users')
const { CredentialsFails } = require ('../../utils/errors')

module.exports = function(username, password){
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)    
    validate.string.notVoid('password', password)

    return new Promise ((resolve, reject) =>{
        const user = users.find(elem => elem.username === username && elem.password === password)

        if(!user) return reject(new CredentialsFails('fail credentials')) 

        resolve(user.id)

    })
}