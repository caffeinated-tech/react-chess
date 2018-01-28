const React = require('react');
const ReactDOM = require('react-dom');
const Reflux = require('reflux');
const { Switch, Route, Link } = require('react-router-dom');
const classNames = require('classnames')

const LoginForm = require('./auth/login.jsx')
const RegisterForm = require('./auth/register.jsx')
const Profile = require('./auth/profile.jsx')
const AuthStore = require('./auth/store.js');
const LoggedOutHeader = require('./auth/logged_out_header.jsx');
const LoggedInHeader = require('./auth/logged_in_header.jsx');

class AuthPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = AuthStore; 
  }

  render() {
    return (
      <div className="centered">
        <div className="pure-g">
          { this.state.user == null 
            ? <LoggedOutHeader/>
            : <LoggedInHeader {...this.state}/>
          }
          <Switch>
            {/* 
              need to use the render prop instead of component so the state 
              from the auth store can be passed down to the various login 
              sub-pages
            */}
            <Route path="/auth/login" render={ () => (
              <LoginForm {...this.state}/>
            )}/>
            <Route path="/auth/signup" render={ () => (
              <RegisterForm {...this.state}/>
            )}/>
            <Route path="/auth/profile" render={ () => (
              <Profile {...this.state}/>
            )}/>
          </Switch>
        </div>
      </div>
    );
  }
}

module.exports = AuthPage;