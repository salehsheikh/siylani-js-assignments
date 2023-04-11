// 1. Write a function that creates a closure and returns a function that can add
// a specific number to any number passed to it. For example, if the closure is
// created with 5, the returned function should add 5 to any number passed
// to it.
// function addNum(num){
//     return function(value){
//         return num+value;
//     }
// }
// const add=addNum(5);
// console.log(add(15));

// Write a recursive function that searches an array for a specific value. The
// function should return true if the value is found, and false if it is not. You
// can assume that the array is not nested.
// function searchArray(arr, val) {
//   if (arr.length === 0) {
//     return false;
//   } else if (arr[0] === val) {
//     return true;
//   } else {
//     return searchArray(arr.slice(1), val);
//   }
// }
// const arr = [1, 2, 3, 4, 5];
// const val = 3;
// if (searchArray(arr, val)) {
//   console.log(`The value ${val} was found in the array.`);
// } else {
//   console.log(`The value ${val} was not found in the array.`);
// }

//Write a function that adds a new paragraph element to the bottom of an
// HTML document. The function should take a string argument that will be
// used as the text content of the new paragraph element.
// function saveObjectToLocalStorage(key, obj) {
//     localStorage.setItem(key, JSON.stringify(obj));
//   }
//   const object = { name: 'saleh', age: 22};
//   saveObjectToLocalStorage('object', object);
 


// function getFromLocalStorage(key) {
//     const json = localStorage.getItem(key);
//     const object = JSON.parse(json);
//     return object;
//   }
//   const myObject = getFromLocalStorage("saleh");
//   console.log(myObject);

function saveObjectToLocalStorage(object) {
    // Iterate over the object properties
    for (const [key, value] of Object.entries(object)) {
      // Save each property to localStorage
      localStorage.setItem(key, JSON.stringify(value));
    }
    
    // Retrieve the object from localStorage
    const newObject = {};
    for (const key of Object.keys(object)) {
      const value = JSON.parse(localStorage.getItem(key));
      newObject[key] = value;
    }
    
    // Return the new object
    return newObject;
  }
  
  // Example usage
  const myObject = { name: "John", age: 30 };
  const newObject = saveObjectToLocalStorage(myObject);
  console.log(newObject);