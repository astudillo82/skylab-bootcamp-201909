var letters = ['a','b','c','d','e']

function indexOf(array, element) {debugger
    for (var i = 0; i < array.length; i++) {
        if(array[i]=== element)
        return i ;       
    }
    return -1;
}

console.log(indexOf(letters, 'c'))