const React = require('react');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');

class AuthPage extends React.Component {
   render() {
      return (
        <form className="pure-form pure-form-aligned">
          <fieldset>
            <div className="pure-control-group">
              <label htmlFor="name">Username</label>
              <input id="name" type="text" placeholder="Username"/>
            </div>
            <div className="pure-control-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Password"/>
            </div>
            <div className="pure-controls">
              <button 
                type="submit" 
                className="pure-button pure-button-primary">Login</button>
            </div>
          </fieldset>
        </form> 
      );
   }
}

module.exports = AuthPage;