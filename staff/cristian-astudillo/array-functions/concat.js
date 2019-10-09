// var letters1 = ['a','b','c'];
// var Letters2 = ['d', 'e', 'f'];

// var newLetters = letters1.concat(Letters2);
// console.log(newLetters);


var letters1 = ['a','b','c'];
var letters2 = ['d', 'e', 'f'];



function concat(array1, array2) {
    var newArray = [...array1,... array2];//sin usar SPREAD OPERATOR
    return newArray
}

console.log(concat(letters1, letters2))


// var letters1 = ['a','b','c', 1,2,3];
// var letters2 = ['d', 'e', 'f'];
// var newArray = [...letters1, ...letters2];
// console.log(newArray);