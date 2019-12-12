module.exports = {
    registerUser: require('../logic/register-user'),
    authenticateUser : require('../logic/authenticate-user'),
    retrieveUser : require('../logic/retrieve-user'),
    updateUser : require ('../logic/update-user'),
    deleteUser : require ('../logic/delete-user'),
    createPost : require('../logic/create-post'),
    modifyPost : require('../logic/modify-post'),
    retrievePost : require('../logic/retrieve-post'),
    retrieveAllPosts : require('../logic/retrieve-all-posts'),
    deletePost : require('../logic/delete-post'),
    createComment : require('../logic/create-comment'),
    modifyComment : require('../logic/modify-comment'),
    deleteComment : require('../logic/delete-comment')

}