/**
 * Itearates an array and evaluates an expression on each item.
 * 
 * @param {Array} array The array to iterate.
 * @param {Function} expression The expression to evaluate in each item of the array.
 */
// function forEach(array, expression) {
// 	for (var i = 0; i < array.length; i++) 
// 		expression(array[i]);
// }

// forEach([1,2,3,], console.log)



// ERROR HANDLING //
function forEach(array, expression) {
	if(!(array instanceof Array)) throw TypeError(array + 'is not an array')
	if(typeof expression != 'function' )throw TypeError(expression + " is not a function")

	for (var i = 0; i < array.length; i++) 
			expression(array[i], i ,array);
}

forEach([1,2,3], true)
forEach([1,2,3], console.log)
forEach([1,2,3])