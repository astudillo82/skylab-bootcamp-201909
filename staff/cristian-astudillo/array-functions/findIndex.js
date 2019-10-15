/**
 * 
 * @param {Array} array The array to iterate
 * @param {Function} expression The expression to evaluate in each item of the array.
 */


function findIndex(array, expression) {
    for (let i = 0; i < array.length; i++) {
        if (expression(array[i])) {
            return i;
        }
    }
    return -1;
}

function index(element) {
    return element == 4;
};

function index_2(element) {
    return element >= 11;
};




