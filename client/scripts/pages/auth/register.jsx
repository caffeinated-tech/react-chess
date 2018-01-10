const React = require('react');
const ReactDOM = require('react-dom');

const Actions = require('./actions.js')

class RegisterForm extends React.Component {
  constructor(){
    super()
    this.fields = {};
  }

  render() {
    return (
      <form className="pure-form pure-form-aligned">
        <fieldset>
          <div className="pure-control-group">
            <label htmlFor="name">Username</label>
            <input 
              ref={ function (ref){ this.fields.username = ref; }.bind(this)}
              id="name" 
              type="text" 
              placeholder="Username"/>
          </div>
          <div className="pure-control-group">
            <label htmlFor="email">Email Address</label>
            <input 
              ref={ function (ref){ this.fields.email = ref; }.bind(this)}
              id="email" 
              type="email" 
              placeholder="Email Address"/>
          </div>
          <div className="pure-control-group">
            <label htmlFor="password">Password</label>
            <input 
              ref={ function (ref){ this.fields.password = ref; }.bind(this)}
              id="password" 
              type="password" 
              placeholder="Password"/>
          </div>
          <div className="pure-control-group">
            <label htmlFor="password">Re-enter Password</label>
            <input 
              ref={ function (ref){ this.fields.passwordConfirm = ref; }.bind(this)}
              id="password" 
              type="password" 
              placeholder="Password"/>
          </div>
          <div className="pure-controls">
            <button 
              type="button" 
              onClick={this.submitForm.bind(this)}
              className="pure-button pure-button-primary">
              Submit
            </button>
          </div>
        </fieldset>
      </form> 
    );
  }

  submitForm() {
    console.log('submit forms')
    console.log({
      username: this.fields.username.value,
      email: this.fields.email.value,
      password: this.fields.password.value,
      passwordConfirm: this.fields.passwordConfirm.value
    })
    // todo compare password with retyped version
    let password = this.fields.password.value;
    let passwordConfirm = this.fields.passwordConfirm.value;
    console.log(password);
    if(password == passwordConfirm){
      Actions.signup({
        username: this.fields.username.value,
        email: this.fields.email.value,
        password: this.fields.password.value
      });
    } else {
      alert('Passwords don\'t match');
    }
  }
}

module.exports = RegisterForm;