const { Router } = require('express') 
const bodyParser = require('body-parser')
const { env: { SECRET } } = process
const tokenVerifier = require('../helpers/token-verifier') (SECRET)
const router = Router()
const jsonBodyParser = bodyParser.json()


/**********************************************************************
 * CONNECT TO LOGIC
 *********************************************************************/

 // USER
const { registerUser, authenticateUser, retrieveUser, updateUser, deleteUser } = require('./user')

//POST
const { createPost, modifyPost, retrievePost, retrieveAllPosts} = require('./posts')

//COMMENT
const { createComment } = require('./comment')



/**********************************************************************
 * ENDPOINTS
 *********************************************************************/


// USER
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users/:id', tokenVerifier, retrieveUser)
router.put('/users/:id', [tokenVerifier, jsonBodyParser], updateUser)
router.delete('/users/:id',[tokenVerifier, jsonBodyParser], deleteUser)

//POST
router.post('/posts', jsonBodyParser, createPost)
router.get('/posts/:id', tokenVerifier, retrievePost)
// router.get('./posts', [tokenVerifier, jsonBodyParser], retrieveAllPosts )
router.put('/posts/:id', [tokenVerifier, jsonBodyParser],modifyPost)


//COMMENT
router.post('/comment', jsonBodyParser, createComment)


module.exports = router