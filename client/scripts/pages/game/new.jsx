const React = require('react');
const Reflux = require('reflux');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');
const classNames = require('classnames');

const PlayerStats = require('../../common/stats/players.jsx')

class NewGame extends Reflux.Component {

  componentDidMount(){
    browser && socket.joinGame();
  }

  render() {
    return (
      <div className="centered">
        <div className="pure-g">
          <div className="pure-u-1">
            <h1>
              Starting New Game
            </h1>
            <p>
              Waiting for player to join your game....
            </p>
          </div>
          <div className="centered">
            <PlayerStats/>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = NewGame;