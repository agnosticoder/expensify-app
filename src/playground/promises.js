const promise = new Promise((resolve, reject) => {
    //This is where we do our long running asynchronous task
    //When its done we go ahead and call one of two functions(resolve and reject) depending on it wen well or it didn't go well
    setTimeout(() => {
        // resolve('This is my resolved data');
        //You can only resolve the promise only once, below statement will not run
        // resolve('This is my other resolved data');
        reject('Something went wrong');
    }, 1500)
});

console.log('before');

//promise.then() fires when the promise got resolved and got access to data that got passed to resolve
promise.then((data) => {
    console.log('1 ',data);
}).catch(error => console.log(error));

// promise.then((data) => {
//     console.log('2 ',data);
// });

console.log('after');
