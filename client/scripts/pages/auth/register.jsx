const React = require('react');
const ReactDOM = require('react-dom');

class RegisterForm extends React.Component {
   render() {
      return (
        <form className="pure-form pure-form-aligned">
          <fieldset>
            <div className="pure-control-group">
              <label htmlFor="name">Username</label>
              <input id="name" type="text" placeholder="Username"/>
            </div>

            <div className="pure-control-group">
              <label htmlFor="email">Email Address</label>
              <input id="email" type="email" placeholder="Email Address"/>
            </div>

            <div className="pure-control-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Password"/>
            </div>

            <div className="pure-control-group">
              <label htmlFor="password">Re-enter Password</label>
              <input id="password" type="password" placeholder="Password"/>
            </div>

            <div className="pure-controls">
              <button type="submit" className="pure-button pure-button-primary">Submit</button>
            </div>
          </fieldset>
        </form> 
      );
   }
}

module.exports = RegisterForm;