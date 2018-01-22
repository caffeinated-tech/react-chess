const React = require('react');
const ReactDOM = require('react-dom');
const Reflux = require('reflux');
const { NavLink } = require('react-router-dom');
const classNames = require('classnames')


class LoggedOutHeader extends Reflux.Component {
  render() {
    return (
      <div className="pure-u-1 form-switch">
        <NavLink 
          to="/auth/login" 
          className="pure-menu-link"
          activeClassName="active">
          Login
        </NavLink>
        <NavLink 
          to="/auth/signup" 
          className="pure-menu-link"
          activeClassName="active">
          Signup
        </NavLink>
        <hr/>
      </div>
    );
  }
}

module.exports = LoggedOutHeader;