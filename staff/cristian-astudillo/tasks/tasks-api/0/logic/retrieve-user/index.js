const validate =  require('../../utils/validate')
const users = require('../../data/users')
const { ErrorIsNotFound} = require('../../utils/errors')

module.exports = function(id){
    validate.string(id)
    validate.string.notVoid('id', id)

    return new Promise((resolve, reject)=> {
        const user = users.find(user => user.id)

        if(!user) return reject(new ErrorIsNotFound(`your id ${id} is not found`))

        const {id : _id, name, surname, email, username} = user

        resolve({id : _id, name, surname, email, username})

    })

}