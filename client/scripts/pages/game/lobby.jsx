const React = require('react');
const Reflux = require('reflux');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');
const classNames = require('classnames');

const LobbyStore = require('./lobby/store.js');

class Lobby extends Reflux.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.store = LobbyStore;
  }

  render() {
    return (
      <div className="centered">
        <div className="pure-g">
          <div className="pure-u-1">
            <h1>
              Game Lobby
            </h1>
          </div>
          <div className="pure-u-1">
            <p>
              Play against the next person looking for a game
            </p>
          </div>
          <div className="pure-u-1">
            <Link 
              to="/game/new" 
              className="pure-button pure-button-primary">Let's Play</Link>
          </div>
          <br/>
        </div>
      </div>
    );
  }
}

module.exports = Lobby;