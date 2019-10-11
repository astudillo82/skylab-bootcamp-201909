var letters = ['a','b','c','d','e']

function indexOf(array, element) {debugger
    for (let i = 0; i < array.length; i++) {
        if(array[i]=== element)
        return array[i]        
    }
    
}

console.log(indexOf(letters, 'b'))