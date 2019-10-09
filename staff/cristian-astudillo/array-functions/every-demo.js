console.log(' DEMO every')

console.log("all elements in the array pass the test implemented by the provided function.")

var numbers = [1,2,3,4,5];

every(numbers,greaterThan);

function greaterThan(numbers) {
    return numbers > 10;
    }


    
