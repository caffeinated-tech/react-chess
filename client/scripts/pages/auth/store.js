const Reflux = require('reflux');

const Actions = require('./actions.js')

const socket = require('./socket.js')

class AuthStore extends Reflux.Store {
  constructor() {
    super();
    this.user = null;

    this.state = {
      user: this.user
    };
    this.display = {
      form: 'login'
    }
    this.listenToMany(Actions);
  }

  initializeState(props) {
    this.user = props.user;
    this.setState({ user: this.user });
  }

  // action callbacks

  onSignup(){
    console.log('onSignup')
  }

  onSignupCompleted(response){
    console.log('onSignupCompleted', response)
    console.log('data', response.data)
    this.user = response.data.user;
    this.setState({ user: this.user });
    RouterHistory.push('/auth/profile');

  }

  onSignupFailed(){
    console.log('onSignupFailed')

  }

  onLogin(){
    console.log('onLogin')
  }

  onLoginCompleted(response){
    console.log('onLoginCompleted', response)
    console.log('data', response.data)
    this.user = response.data.user;
    this.setState({ user: this.user });
    RouterHistory.push('/auth/profile');
  }

  onLoginFailed(){
    console.log('onLoginFailed')

  }

  onLogout(){
    console.log('onLogout')
  }

  onLogoutCompleted(response){
    console.log('onLogoutCompleted', response)
    console.log('data', response.data)
    RouterHistory.push('/auth/login');
    this.user = null;
    this.setState({ user: this.user });
  }

  onLogoutFailed(){
    console.log('onLogoutFailed')
  }

  // private methods
}

module.exports = Reflux.initStore(AuthStore);