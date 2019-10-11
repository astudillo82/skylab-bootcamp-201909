var numbers = [4,52,12,5,8];

function find(array, expression){
    debugger
    for (let i = 0; i < array.length; i++) {
        if(expression(array[i]) ){
            return array[i];
        };
    };
};


function index(element){
    return element > 12 
}

console.log(find(numbers,index))