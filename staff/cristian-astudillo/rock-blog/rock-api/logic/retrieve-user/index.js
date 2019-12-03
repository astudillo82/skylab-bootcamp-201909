const { models : { User }} = require('rock-data')
const { validate } = require('rock-util')

const retrieveUser = (id) =>{
    validate.string(id)

    return (async () => {
        let user = await User.findById(id).lean()

        if(!user) throw new Error(`User with ${id} does not exists`)

        user.id = user._id.toString()

        delete user._id
        delete user.__v

        return user
    })()
}

module.exports = retrieveUser