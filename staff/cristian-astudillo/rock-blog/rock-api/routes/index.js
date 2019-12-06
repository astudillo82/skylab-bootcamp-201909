const { Router } = require('express') // requiere frameword "express"
const bodyParser = require('body-parser')
const tokenVerifier = require('../helpers/token-verifier')
const router = Router()
const jsonBodyParser = bodyParser.json()



/**********************************************************************
 * CONNECT TO LOGIC
 *********************************************************************/

 // USER
const registerUser = require('./user/register')
const authenticateUser = require('./authenticate-user')
const retrieveUser = require('./retrieve-user')

const updateUser = require('./update-user')
const deleteUser = require('./delete-user')
const createPost = require('./create-post')
const modifyPost = require('./modify-post')


/**********************************************************************
 * ENDPOINTS
 *********************************************************************/

 // USER
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users', [tokenVerifier, jsonBodyParser], retrieveUser)

module.exports = router