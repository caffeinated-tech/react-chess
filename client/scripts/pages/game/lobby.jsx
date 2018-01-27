const React = require('react');
const Reflux = require('reflux');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');
const classNames = require('classnames');

class Lobby extends Reflux.Component {
  constructor(props){
    super(props);
    this.state = {
      code: ''
    }
  }

  render() {
    console.log('this.state.code', this.state.code);
    return (
      <div className="centered">
        <div className="pure-g">
          <div className="pure-u-1">
            <h1>
              Game Lobby
            </h1>
          </div>
          <div className="pure-u-18 -24">
            <p>
              Create a new game to invite a specific friend or let any other 
                player 
            </p>
          </div>
          <div className="pure-u-4-24">
            <Link 
              to="/game/new" 
              className="pure-button pure-button-primary">Just Play</Link>
          </div>

          <div className="pure-u-1">
            <label htmlFor="code">Join a game by code</label>
            <input 
              id="code" 
              type="text" 
              value={this.state.code}
              onChange={function(event){
                this.setState({code: event.target.value});}.bind(this)}
              placeholder="Enter unique game code here"/>
            <Link 
              to={ "/game/play/" + this.state.code }
              className="pure-button pure-button-primary">Join</Link>
          </div>

          <div className="pure-u-1">
            <Link 
              to="/game/watch" 
              className="pure-button pure-button-primary">Spectate</Link>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Lobby;