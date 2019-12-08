// ROCK-UTIL/INDEX.JS : ES EL ÍNDICE DEL "VALIDATE" QUE REQUIERE EL MÓDULO "LOGIC/VALIDATE"


/**
 * A module that exports the validates
 * @module logic/validate.js
 */

module.exports = { 
    validate: require('./logic/validate'),
    errors: require('./errors'),
    validators: require('./validators'),
    polyfills: require('./polyfills')
}

