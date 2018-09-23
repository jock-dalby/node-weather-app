const somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() < 0.5) {
      resolve({ data: 'test' });
    } else {
      reject('Unable to get data');
    }
  }, 1000)
});
// When waiting for a promise to either be resolved or rejected, it is considered 'pending'
// When a promise has either been resolved or rejected, it is considered 'settled'

// .then() will only be called when the promise is either resolved or rejected
somePromise.then(
  // If the promise resolves, the first arg will be executed
  data => console.log('Success: Here is your data ==> ', data),
  // else the second arg will be executed
  errorMessage => console.log('Failed: ', errorMessage),
);

// Primses with args
const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isTypeNumber(a) && isTypeNumber(b)) {
        resolve(a+b);
      } else {
        reject('Arguments must be numbers');
      }
    }, 1000);
  })
}

const isTypeNumber = val => typeof val === 'number';

asyncAdd(5, 12).then(
  total => console.log('5 + 12 = ', total),
  errorMessage => console.log('Error ', errorMessage),
);