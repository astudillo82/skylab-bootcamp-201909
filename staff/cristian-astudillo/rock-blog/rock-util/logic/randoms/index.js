const random = {
    integer: function (min, max) {
        if(!arguments.length) throw new Error('The arguments are voids')
        if(!(Number.isInteger(min) && Number.isInteger(max))) throw Error('One or two of them are float numbers')
        return Math.floor(Math.random() * (max - min)) + min     
    },
    array : function () {
        const elements = [...arguments]   
        const randomItem = elements[Math.floor(Math.random() * elements.length)]
        if(!elements.length) throw new Error(`The arguments are voids`) 
        return randomItem       
    }
}

module.exports = random