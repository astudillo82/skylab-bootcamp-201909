/**
 * 
 * @param {Array} array Required. The value of the current element.
 * @param {Expression} expression The array that find was called on.
 */


function find(array, expression){   
    for (let i = 0; i < array.length; i++) {
        if(expression(array[i]) ){
            return array[i];
        };
    };
};

function index(element){
    return element > 12 
}

