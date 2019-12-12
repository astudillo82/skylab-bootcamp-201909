// SCHEMAS/INDEX.JS : ES EL ÍNDICE DE LOS ESQUEMAS QUE REQUIERE LOS MÓDULOS "USER" Y "POST"

module.exports = {
    user: require('./user'),//SI DAMOS CLICK, NOS LLEVA A SCHEMAS/USER.JS
    post: require('./post'),//SI DAMOS CLICK, NOS LLEVA A SCHEMAS/POST.JS
    comment : require('./comment')//SI DAMOS CLICK, NOS LLEVA A SCHEMAS/COMMENT.JS
}   