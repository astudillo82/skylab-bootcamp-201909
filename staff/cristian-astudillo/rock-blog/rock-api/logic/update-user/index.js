//UPDATE-USER/INDEX.JS : AQUÍ SE CREA LA LÓGICA DE LA ACTUALIZACIÓN DE USUARIOS

//Se exporta el modelo "User" para poder trabajar con el esquema de usuario y poder validarlos
const { models: { User }} = require('rock-data')

//Se exporta el "VALIDATE" para poder validar los datos si son correctos o no
const { validate } = require('rock-util')

const update = (username, update) =>{
    validate.string(username)
    validate.object(update)

}