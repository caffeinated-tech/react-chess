const React = require('react');
const Reflux = require('reflux');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');
const classNames = require('classnames');

class Spectate extends Reflux.Component {

  render() {
    return (
      <div className="centered">
        <div className="pure-g">
          <div className="pure-u-1">
            <h1>
              Watch live game
            </h1>
            <br/>
            <h3>
              ...
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Spectate;