var letters1 = ['a','b','c'];
var letters2 = ['d', 'e', 'f'];



function concat(array_1, array_2) {debugger 
    var array = array_1;
        for(let i = 0; i < array_2.length; i++){
            array += array_2[i];            
        }  

    return array;
}

console.log(concat(letters1, letters2));






