const express = require('express')
const bodyParser = require('body-parser')
const { name, version } = require ('./package.json')

const api = express()
debugger
const jsonBodyParser = bodyParser.json()

const { argv : [, , port = 8080] } = process
debugger
api.post ('/users', jsonBodyParser, (req, res) => { debugger
    const { body : { name, surname, email, username, password }} = req
    debugger
    res.json({
        message : `I'm registered right now ${name} ${surname} ${email} ${username} ${password}`
    })
})

api.listen(port, () => console.log(`this is the name ${name}, version ${version} up and running on port ${port}`))