/**
  
 
 * 
 */



//var numbers = [1,2,3,4,5,6];




 function includes(array, value, startIndex){debugger
     for (let i = startIndex || 0 ; i < array.length; i++) {   
            if(array[i]=== value) 
            return true;
        }
    return false
 }
console.log(includes(numbers,2,1));