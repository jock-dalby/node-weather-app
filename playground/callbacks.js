const getUser = (id, callback) => {
  const user = {
    id,
    name: 'Jock'
  }
  callback(user);
};

getUser(5, user => console.log('User: ', user));