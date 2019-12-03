// VALIDATE/INDEX.JS: NOS SIRVE PARA TRABAJAR EN NUESTRA LÓGICA PARA VALIDAR DATOS PRIMITIVOS, OBJECT Y FUNCTION, SI SON CORRECTOS O NO SEGÚN LOS DATOS QUE ESTÉ INGRESANDO LOS USUARIOS.  



const validate = {    

    string: function (target) {
        if(typeof(target) !== 'string') throw new Error (`${target} is not a string`)
    }, 

    number: function (target) {
        if(typeof(target) !=='number') throw new Error (`${target} is not a number`)
    },    

    boolean: function (target) {
        if(typeof(target)!=='boolean') throw new Error(`${target} is not a boolean`)
    },    

    array: function(target) {
        if(!(target instanceof Array)) throw new Error (`${target} is not an array`)
    },

    email: function(target) {
        const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        const result = EMAIL_REGEX.test(target)

        if(!result) throw new Error(`${target} is not an email`)       
    },

    object: function(target) {
        if(!(target instanceof Object)) throw new Error(`${target} is not an object`)
    },

    function: function(target) {
        if(!(target instanceof Function)) throw new Error(`${target} is not a function`)
    }

}

module.exports = validate

