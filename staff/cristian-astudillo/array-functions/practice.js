function dfind(arr,fn) {
  for (item in arr) {
    if(fn(arr[item])){
      return arr[item]
    }
  }
  return undefined;
}