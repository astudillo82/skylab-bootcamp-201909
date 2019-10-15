var numbers = [1,2,3,4,5,6];


debugger
function some(array, expression) {
    for (var i  = 0; i < array.length; i++) {
        if(!(expression(array[i]))){
            return false;
        }
        return true;
    }
}


function test(element) {
    return element > 10;
    
}

console.log(numbers, test)