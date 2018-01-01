const React = require('react');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');
const classNames = require('classnames')

const LoginForm = require('./auth/login.jsx')
const RegisterForm = require('./auth/register.jsx')

class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      form: 'login' 
    };
  }

  render() {
    return (
      <div className="centered">
        <div className="pure-g">
          <div className="pure-u-1 form-switch">
            <button 
              onClick={this.changeFormView.bind(this,'login')}
              className={classNames("button-xlarge", { 
                active: this.state.form == 'login'})}>Login</button>
            <button 
              onClick={this.changeFormView.bind(this,'register')}
              className={classNames("button-xlarge", { 
                active: this.state.form == 'register'})}>Register</button>
            <hr/>
          </div>
        </div>
        { this.state.form == 'login' 
          ? <LoginForm/>
          : <RegisterForm/>
        }
      </div>
    );
  }

  changeFormView(newView) {
    this.setState({ form: newView });
  }
}

module.exports = AuthPage;