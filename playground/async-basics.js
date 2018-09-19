console.log('Starting app');

// Using non-blocking i/o we can continue to process the rest of the code while waiting for this 2 seconds to happen
setTimeout(() => {
  console.log('Inside of callback');
}, 2000)

// 0 sec setTimeout moves the task to end of current call stack. So will print the console.log when
// has finished rest of code in the file.
setTimeout(() => {
  console.log('Second setTimeout')
})
console.log('Finishing app');