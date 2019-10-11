/**
 * 
 * @param {Array} array The array to iterate
 * @param {Function} expression to evaluate in each item of the array.
 */



function every(array, expression){
    
    for (let i = 0; i < array.length; i++) {   
        if(!(expression(array[i]))){
             return false;      
        }
    }
    return true;
}

function aux(element) {
    return element < 10; //retorna valor booleano(true, false)
}

function aux1(element) {
    return element === 10; //retorna valor booleano(true, false)
}


function aux2(element) {
    return element > 10 && element < 15; //retorna valor booleano(true, false)
}
every([2,3,11,5,6], aux)

every([10,10,11], aux1)

every([2,3,4,5,6], aux2)