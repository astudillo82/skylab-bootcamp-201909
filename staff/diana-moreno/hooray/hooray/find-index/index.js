/**
 * Returns the index of the first element in the provided array that satisfies the provided testing function.
 * @param  {Array}   array Array to find in
 * @param  {Function} expression   Function that returns a condition
 * @return {Number}        First index that matches the condition
 * @throws {TypeError}    If expression is not a function
 */
Hooray.prototype.findIndex = function(expression) {
  if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

  for (var i = 0; i < this.length; i++)
    if (expression(this[i])) return i;

  return -1;
};
