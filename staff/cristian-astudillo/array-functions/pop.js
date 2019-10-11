/**
 * Removes the last element from an array and returns that element. 
 * This method changes the length of the array.

 * @param {Array} array The array to pop elements to.
 */

function pop(array) {
    var lastElement = array[array.length-1]; 
    array.length = array.length-1;
    return lastElement;
   
}








