

function find(array, expression){ debugger
    for (var i=0; i<array.length; i++){ debugger
        if (expression(array[i])){ 
            return i;
        } 
    } return -1;
}