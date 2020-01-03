'use strict';

// YOU KNOW WHAT TO DO //

/**
 * idenity: Return the given value unaltered.
 * 
 * @param {Any Value} value: Can be any datatype
 * 
 * @return {Any Value}: Same value as input, unaltered
 */
function identity(value) {
     return value;
}
module.exports.identity = identity;


/**
 * typeOf: Returns the type of the argument's value as a string
 * 
 * @param {Any Value) value: Can be any datatype
 * 
 * @return {String}: The name of value written as a string
 */
function typeOf(value){
    if(typeof value === 'string') return 'string';
    if(typeof value === 'number') return 'number';
    if(Array.isArray(value)) return 'array';
    if(value === null) return 'null';
    if(value === undefined) return 'undefined';
    if(typeof value === 'boolean') return 'boolean';
    if(typeof value === 'function') return 'function';
    if(typeof value === 'object') return 'object';
}
module.exports.typeOf = typeOf;


/**
 * first: Returns the first given number of items from a given array. If arr 
 * is not an array, return an empty array.If num is a negative number, return
 * an empty array.
 * 
 * @param {Array} arr: An array of numbers
 * @param {Number} num: The amount of items to return from arr
 * 
 * @return {Array}: The first num of items in arr
 */
function first(arr, num) {
    if(!Array.isArray(arr) || num < 0) return [];
    if(typeof num !== 'number') return arr[0];
    return arr.slice(0, num);
}
module.exports.first = first;


/**
 * last: Returns the last given number of items from a given array. If arr 
 * is not an array, return an empty array. If num is a negative number, return
 * an empty array. Should return the whole array if numerical argument is 
 * greater than the array's length.
 * 
 * @param {Array} arr: An array of numbers
 * @param {Number} num: The amount of items to return from arr
 * 
 * @return {Array}: The last num of items in arr
 */
function last(arr, num){
    if(!Array.isArray(arr) || num < 0) return [];
    if(typeof num !== 'number') return arr[arr.length-1];
    return arr.slice(-num);
}
module.exports.last = last;


/**
 * indexOf: Returns the index of the array that is the first occurance
 * of the given value.
 * 
 * @param {Array} arr: An array values to search through
 * @param {Any Value} val: The value to search for in arr
 * 
 * @return {Number}: The index of the array that is the first occurance
 * of val
 */
function indexOf(arr, val){
    for(let i = 0; i < arr.length; i++) if(arr[i] === val) return i;
    return -1;
}
module.exports.indexOf = indexOf;


/**
 * contains: Returns true if given array contains given value,
 * otherwise returns false.
 * 
 * @param {Array} arr: An array values to search through
 * @param {Any Value} val: The value to search for in arr
 * 
 * @return {Boolean}: returns true if arr contains val, otherwise 
 * returns false
 */
function contains(arr, val){
    let trueArray = arr.filter(x => x === val);
    return (trueArray.length > 0) ? true: false;
}
module.exports.contains = contains;


/** 
* each: takes a collection and a function and performs the function on
* every element or key/value pair of the collection. Works with arrays and
* objects.
* 
* @param {Collection} collection: Collection can be an array or an object.
* Based on which one is given, each() will then perform func on each element
* or property of collection.
* @param {Function} func: A function that is has three parameters and will
* be called on every element or key/value pair of collection. If collection 
* is an array, each() will call func on every element. Func will use these 
* as its arguments: the element, it's index, <collection>. If collection is 
* an object, func will use these as its arguments: the property's value, its 
* key, <collection>.
* 
* @return {n/a}
*/
function each(collection, func){
    if(Array.isArray(collection)){
        for(let i = 0; i < collection.length; i++){
            func(collection[i], i, collection);
        }
    } else if(typeof collection === 'object'){
        for(let key in collection){
            func(collection[key], key, collection);
        }
    }
}
module.exports.each = each;


/** 
* unique: returns a new array of all elements from <arr> 
* without any duplicate values
* 
* @param {Array} arr: an array that is copied to a new array without
* its duplicate values included
* 
* @return {Array} newArr: the new array that contains only unique values fo arr
*/
function unique(arr){
    let newArr = [arr[0]];
    
    for(let i = 0; i < arr.length; i++){
        if(!newArr.includes(arr[i])) newArr.push(arr[i]);
    }
    
    return newArr;
}
module.exports.unique = unique;


/** 
* filter: Calls a function on each element of an array passing the arguments
* of: the element, it's index, the array. If the elements return true after the
* function is called on them, they are returned in a new array.
* 
* @param {Array} arr: The array to loop over and perform functions on
* @param {Function} func: The function that is called on each index of arr
* 
* @return {Array} newArr: A new array that holds the values of the elements that
* returned true after func was called on them.
*/
function filter(arr, func){
    const newArr = [];
    each(arr, (e, i, a) => {if(func(e, i, a)) newArr.push(e)});
    return newArr;
}
module.exports.filter = filter;


/** 
* reject: Calls a function on each element of an array passing the arguments
* of: the element, it's index, the array. If the elements return false after the
* function is called on them, they are returned in a new array.
* 
* @param {Array} arr: The array to loop over and perform functions on
* @param {Function} action: The function that is called on each index of arr
* 
* @return {Array} newArr: A new array that holds the values of the elements that
* returned false after func was called on them.
*/
function reject(arr, action){
    const newArr = [];
    filter(arr, (e, i, a) =>{if(!action(e, i, a)) newArr.push(e)});
    return newArr;
}
module.exports.reject = reject;


/** 
* partition: calls a function on each element in an array and returns an array
* that consists of two arrays. The first is all of the elements that were truthy
* values after passing through the given function and the second of the two arrays
* are all of the elements that were falsey values after being passed through the
* function.
* 
* @param {Array} array: Element is from array is passed through the given function
* @param {Function} action: The function that is performed on each element of array
* 
* @result {Array}: an array of two arrays - the first consisting of truthy values
* and the second consisting of falsey values
*/
function partition(array, action){
    return [filter(array, action), reject(array, action)];
}
module.exports.partition = partition;


/** 
* map: Calls a function for each element in a collection and saves the return
* values to a new array, then returns the new array.
* 
* @param {Collection} collection: an array or object from which its elements or
* key values are passed through the given function
* @param {Function} func: The function that is called on each element or key value
* 
* @result {Array} newArray: An array that is returned holding all of the values
* that resulted from passing elements or key values through the given function
*/
function map(collection, func){
    const newArray = [];
    each(collection, (v, i, c) => {newArray.push(func(v, i, c))});
    return newArray;
}
module.exports.map = map;


/** 
* pluck: Returns an array containing the value of prop for every element in array
* 
* @param {Array of Objects} array: an array of objects
* @param {A property} prop: the name of the property to retrieve value from
* 
* @result {Array}: An array consisting of the property values from each object
*/
function pluck(array, prop){
    return map(array, (v) => v[prop]);
}
module.exports.pluck = pluck;

/** 
* every: Calls a function on every element of collection with the parameters:
*   Collection === Array: current element, its index, array
*   Collection === Object: current value, current key, object
* Return false if any values returned from function are false, otherwise return true. 
* If function is not provided return false if any elements of collection are false,
* otherwise return true.
* 
* @param {Collection} collection: The collection of values to call the given function
* on then to test if any of the returned values are false.
* @param {Function} func: The function to call on each element of collection
* 
* @result {Boolean} answer: Returns true unless any falsey values are found
*/
function every(collection, func){
    let answer = true;
    
    if(!func){
        each(collection, (e, i, c) =>{if(e === false) answer = false});
        return answer;
    }

    const testArray = map(collection, (e, i, c) => func(e, i, c));
    each(testArray, (e, i, c) => {if(e === false) answer = false});
    return answer;
}
module.exports.every = every;



/** 
* some: Calls a function on every element of collection with the parameters:
*   Collection === Array: current element, its index, array
*   Collection === Object: current value, current key, object
* Return true if any values returned from function are true, otherwise return false. 
* If function is not provided return true if any elements of collection are true,
* otherwise return false.
* 
* @param {Collection} collection: The collection of values to call the given function
* on then to test if any of the returned values are true.
* @param {Function} func: The function to call on each element of collection
* 
* @result {Boolean} answer: Returns false unless any truthy values are found
*/
function some(collection, func){
    let answer = false;
    
    if(!func){
        each(collection, (e, i, c) =>{if(e === true) answer = true});
        return answer;
    }

    const testArray = map(collection, (e, i, c) => func(e, i, c));
    each(testArray, (e, i, c) => {if(e === true) answer = true});
    return answer;
}
module.exports.some = some;


/** 
* reduce: Reduces a collection down to a single value. Takes three arguments: array,
* a function, and a seed. The function is performed on each element of the array. 
* The function takes three arguments: previous result, element, index. The return 
* value of is assigned to previous result. If the seed was given it is assigned to be
* previous result for the first iteration. If no seed was given then previous result
* will start as the first index of array. Return final value of the function call
* after the last iteration.
* 
* @param {Array} array: The array to iterate over and reduce to one value
* @param {Function} func: The function to perform on each element in array
* @param {Value} seed: If present, it's the starting value assigned to "previous result"
* 
* @result {Value} seed: The accumulated value of the function calls on each 
* element of array 
*/
function reduce(array, func, seed){
    for(let i = 0; i < array.length; i++){
        if(seed === undefined) {seed = array[0];
        } else {seed = func(seed, array[i], i)}
    }
    return seed;
}
module.exports.reduce = reduce;


/** 
* extend: Takes in any amount of objects as arguments and iterates over them in
* an array to copy the properties of all of the objects on to the first object.
* 
* @param {Object} obj1: The object to receive all of the properties from the other objects
* @param {Object} obj2: An object whose properties are copied to obj1
* 
* @result {Object}: Returns an object with all of the properties combined
*/
function extend(obj1, obj2){
    return reduce(arguments, (obj1, nextObj) => obj1 = Object.assign(obj1, nextObj));
}
module.exports.extend = extend;