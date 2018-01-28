const React = require('react');
const Reflux = require('reflux');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');
const classNames = require('classnames');

const Board = require('./play/board.jsx');
const GameStore = require('./play/store.js');

class GamePage extends Reflux.Component {
  constructor(props){
    super(props);
    this.state = {}; // our store will add its own state to the component's
    this.store = GameStore; // <- just assign the store class itself
  }

  render() {
    return (
      <div className="centered">
        <div className="pure-g">
          <div className="pure-u-1">
            <h1>
              Game View
            </h1>
          </div>
          <div className="pure-u-1">
            <Board {...this.state}/>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = GamePage;