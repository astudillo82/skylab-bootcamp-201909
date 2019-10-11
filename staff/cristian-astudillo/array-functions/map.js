/**
 * 
 * @param {Array} array The array to iterate
 * @param {Function} expression The expression to evaluate in each item of the array.
 */

debugger
function map(array,expression) {
    var newArray = []
    for (let i = 0; i < array.length; i++) {
      newArray[i] = expression(array[i]); 
    }   
    return newArray;
}



