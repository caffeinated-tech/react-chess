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
    this.setState({ user: this.user })
  }

  onSignupFailed(){
    console.log('onSignupFailed')

  }



  // private methods
}

module.exports = Reflux.initStore(AuthStore);