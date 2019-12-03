const { models: { User } } = require('rock-data')
const { validate } = require('rock-util')

const authenticateUser = (username, password) =>{
    validate.string(username)
    validate.string(password)


    return(async () => {
    const user = await User.findOne({username})
    if(!user) throw new Error (`User with username${username} does not exists`)

    if(password !== user.password) throw new Error(`Wrong Credentials`)

    return user._id = id.toString()

    })
}

module.exports = authenticateUser