const React = require('react');
const Reflux = require('reflux');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');
const classNames = require('classnames');

const Board = require('./play/board.jsx');
const Dashboard = require('./play/dashboard.jsx');
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
          <div className="pure-u-1 pure-u-lg-12-24">
            <Dashboard {...this.state}/>
          </div>
          <div className="pure-u-1 pure-u-lg-12-24">
            <Board {...this.state}/>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = GamePage;