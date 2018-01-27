const React = require('react');
const Reflux = require('reflux');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');
const classNames = require('classnames');

class NewGame extends Reflux.Component {

  render() {
    return (
      <div className="centered">
        <div className="pure-g">
          <div className="pure-u-1">
            <h1>
              New Game
            </h1>
            <br/>
            <h3>
              Waiting for player to join your game....
            </h3>
            <p>
              TODO: send message over socket to server to either wait for a player
              to join or 
            </p>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = NewGame;