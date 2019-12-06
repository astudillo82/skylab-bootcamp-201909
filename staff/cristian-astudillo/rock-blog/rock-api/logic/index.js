module.exports = {
    registerUser: require('./register-user/'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser : require('./retrieve-user'),
    updateUser : require('./update-user'),
    deleteUser : require('./delete-user'),
    createPost : require('./create-post'),
    modifyPost : require('./modify-post'),
    deletePost : require('./delete-post'),
    createComment : require('./create-comment'),
    modifyComment : require('./modify-comment'),
    deleteComment : require('./delete-comment')
}