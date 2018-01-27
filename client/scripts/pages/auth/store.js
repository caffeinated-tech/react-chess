const Reflux = require('reflux');

const Actions = require('./actions.js')

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
    if (typeof window !== 'undefined') { 
      window.socket.restartSocket()
    }
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
    if (typeof window !== 'undefined') { 
      window.socket.restartSocket()
    }
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
    if (typeof window !== 'undefined') { 
      window.socket.restartSocket()
    }
  }

  onLogoutFailed(){
    console.log('onLogoutFailed')
  }

  // private methods
}

module.exports = Reflux.initStore(AuthStore);