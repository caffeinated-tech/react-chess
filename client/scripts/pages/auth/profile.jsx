const React = require('react');
const ReactDOM = require('react-dom');
const Reflux = require('reflux');
const { Switch, Route, Link } = require('react-router-dom');
const classNames = require('classnames')

const AuthStore = require('./store.js');
const Actions = require('./actions.js')

class ProfilePage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = AuthStore; 
  }

  render() {
    console.log(this.props)
    return (
      <form className="pure-form pure-form-aligned">
        <fieldset>
          <div className="pure-control-group">
            <label htmlFor="name">Username</label>
            <input 
              defaultValue={this.props.user.username}
              type="text" 
              readOnly />
          </div>
          <div className="pure-control-group">
            <label htmlFor="name">Email</label>
            <input 
              defaultValue={this.props.user.email}
              type="text" 
              readOnly />
          </div>
          <div className="pure-control-group">
            <label htmlFor="name">Games Won</label>
            <input 
              defaultValue={this.props.user.won || 0}
              type="number" 
              readOnly />
          </div>
          <div className="pure-control-group">
            <label htmlFor="name">Games Lost</label>
            <input 
              defaultValue={this.props.user.lost || 0}
              type="number" 
              readOnly />
          </div>
          <div className="pure-u-1">
            <button 
              type="button" 
              onClick={Actions.logout}
              className="pure-button pure-button-primary">
              Logout
            </button>
          </div>
        </fieldset>
      </form>
    );
  }

  changeFormView(newView) {
    this.setState({ form: newView });
  }
}

module.exports = ProfilePage;