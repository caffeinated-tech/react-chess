const React = require('react');
const ReactDOM = require('react-dom');
const Reflux = require('reflux');
const { NavLink } = require('react-router-dom');
const classNames = require('classnames')

class LoggedInHeader extends Reflux.Component {
  render() {
    return (
      <div className="pure-u-1">
        <h1>
          Profile & Settings
        </h1>
        <hr/>
        <h2> 
          Hello { this.props.user.username } 
        </h2>
      </div>
    );
  }
}

module.exports = LoggedInHeader;