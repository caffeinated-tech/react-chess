const React = require('react');
const Reflux = require('reflux');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');
const classNames = require('classnames');

const StatsStore = require('./store.js');

class PlayerStats extends Reflux.Component {

  constructor(props){
    super(props);
    this.state = {}; 
    this.store = StatsStore; 
  }

  render() {
    // No stats available on the server side, so the first render will have to
    //  be a placeholder
    if( typeof this.state.connections === 'undefined'){
      return <div>Fetching player info...</div>
    }

    return (
      <div className="stats">
        <div className="pure-g">
          <div className="pure-u-1">
            <h3>
              Players Online
            </h3>
            <h4>
              Users: 
              <b> { this.state.connections.users }</b>
            </h4>
            <h4>
              Guests: 
              <b> { this.state.connections.guests }</b>
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = PlayerStats;