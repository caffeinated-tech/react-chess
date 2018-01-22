const React = require('react');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');

const Actions = require('./actions.js')

class LoginForm extends React.Component {
  constructor(){
    super()
    // placeholder for refs to uncontrolled form components
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
            <label htmlFor="password">Password</label>
            <input 
              ref={ function (ref){ this.fields.password = ref; }.bind(this)}
              id="password" 
              type="password" 
              placeholder="Password"/>
          </div>
          <div className="pure-controls">
            <button 
              type="button" 
              onClick={this.submitForm.bind(this)}
              className="pure-button pure-button-primary">
              Login
            </button>
          </div>
        </fieldset>
      </form> 
    );
  }

  submitForm() {
    Actions.login({
      username: this.fields.username.value,
      password: this.fields.password.value
    });
  }
}

module.exports = LoginForm;