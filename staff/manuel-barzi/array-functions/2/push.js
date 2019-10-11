/**
 * Pushes a variable number of items into an array.
 * 
 * @param {Array} array The array to push elements to.
 * @param {...any} item The item (or items) to push.
 * 
 * @returns {number} The new length of the array.
 */
function push(array) { 
	for (var i = 1; i < arguments.length; i++)
		array[array.length] = arguments[i]

	//array[0] = ':P'; // forced error to show how a non-robust test is not aware about it

	return array.length
}