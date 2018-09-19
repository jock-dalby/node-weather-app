const getUser = (id, callback) => {
  const user = {
    id,
    name: 'Jock'
  }

  setTimeout(() => {
    callback(user);
  }, 500);
};

getUser(5, user => console.log('User: ', user));