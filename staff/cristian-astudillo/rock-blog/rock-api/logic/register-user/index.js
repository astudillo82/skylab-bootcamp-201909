const { models: { User }} = require('rock-data')
const { validate } = require('rock-util')

const registerUser = (name, surname, username, email, password) => {
    validate.string(name)
    validate.string(surname)
    validate.string(username)
    validate.email(email)
    validate.string(password)

    return (async () =>  {
        await User.create({name, surname, username, email,password})
 })()
}

module.exports = registerUser;