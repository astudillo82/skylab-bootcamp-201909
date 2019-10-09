console.log('DEMO forEach');

var numbers = [1, 2, 3];

console.log('CASE should print each number');
forEach(numbers, function(number) { console.log(number); });

console.log('CASE should multiply each number by 10');
forEach(numbers, function(number) { console.log(number * 10); });

console.log('CASE should express each number with a "is a number" string');
forEach(numbers, function(number) { console.log('this is number ' + number); });

console.log('CASE should add all numbers in an external variable');
var result = 0;

forEach(numbers, function(number) { result += number; });
console.log(result);

console.log('CASE should throw type error or ono array')
try{
    forEach([])
    console.log('hola mundo')
}catch(error){
    console.log("continue")
    

}
