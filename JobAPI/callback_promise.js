/*
A key difference between the two is when using the callback approach, 
we’d normally just pass a callback into a function that would then get called upon completion in order to get the result of something. 
In promises, however, you attach callbacks on the returned promise object.
*/

/*
A Promise has four states: 
    fulfilled: Action related to the promise succeeded
    rejected: Action related to the promise failed
    pending: Promise is still pending i.e. not fulfilled or rejected yet
    settled: Promise has fulfilled or rejected

Parameters:
    Promise constructor takes only one argument which is a callback function (and that callback function is also referred as an anonymous function too).
    Callback function takes two arguments, resolve and reject
    Perform operations inside the callback function and if everything went well then call resolve.
    If desired operations do not go well then call reject.

Benefits of Promises:
    Improves Code Readability
    Better handling of asynchronous operations
    Better flow of control definition in asynchronous logic
    Better Error Handling
*/

var promise = new Promise(function(resolve, reject) {
    const x = "sreejith";
    const y = "sreejith"
    if(x === y) {
        resolve();
    } else {
        reject();
    }
    });
        
    promise.
        then(function () {
            console.log('Success, x === y');
        }).
        catch(function () {
            console.log('Failed, x !== y');
        });
    

/*
The benefit of Callback:

    You can run another function call after waiting for the outcome of a prior function call.
    You can call the parent function from the child function and can also pass data from child to parent.

*/

// The add() function is called with arguments a, b and callback, callback will be executed just after ending of add() function
function add(a, b , callback){
    console.log(`The sum of ${a} and ${b} is ${a+b}`);
    callback();
}
  
// The disp() function is called just after the ending of add() function
function disp(){
    console.log('This must be printed after addition');
}
  
// Calling add() function
add(5,6,disp)
  