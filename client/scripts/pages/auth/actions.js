const Reflux = require('reflux');
const axios = require('axios');

var AuthActions = Reflux.createActions({
  'changeForm': {},
  'login': {
    children: ['completed', 'failed']
  },
  'signup': {
    children: ['completed', 'failed']
  }
});

AuthActions.signup.listen( function({username, email, password}) {
  axios.post('/api/auth/signup', {
    username: username,
    email: email,
    password: password 
  }).then(this.completed)
    .catch(this.failed);
});

AuthActions.login.listen( function({username, password}) {
  axios.post('/api/auth/login', {
    username: username,
    password: password 
  }).then(this.completed)
    .catch(this.failed);
});

module.exports = AuthActions;