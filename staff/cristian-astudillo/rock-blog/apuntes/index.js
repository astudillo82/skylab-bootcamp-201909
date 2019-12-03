// ROCK-API/LOGIC/INDEX.JS: ES EL "ÍNDICE"(INDEX) DE NUESTRO PROYECTO.  

module.exports = {
    registerUser : require('./register-user'),//SI DAMOS CLICK, NOS LLEVA A REGISTER-USER/INDEX.JS
    authenticateUser: require('./authenticate-user'),//SI DAMOS CLICK, NOS LLEVA A AUTHENTICATE-USER/INDEX.JS
    retrieveUser: require('./retrieve-user'),//SI DAMOS CLICK, NOS LLEVA A RETRIEVE-USER/INDEX.JS
    updateUser : require ('./update-user'),//SI DAMOS CLICK, NOS LLEVA A RETRIEVE-USER/INDEX.JS    
    createUser : require ('./create-post')//SI DAMOS CLICK, NOS LLEVA A CREATE-USER/INDEX.JS   
}