const React = require('react');
const Reflux = require('reflux');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');
const classNames = require('classnames');

const Lobby = require('./game/lobby.jsx');
const New = require('./game/new.jsx');
const Spectate = require('./game/spectate.jsx');
const Play = require('./game/play.jsx');

class GamePage extends Reflux.Component {

  render() {
    return (
      <Switch>
        <Route path='/game/new' component={ New } />
        <Route path='/game/watch' component={ Spectate } />
        <Route path='/game/play' component={ Play } />
        <Route component={Lobby}/>
      </Switch>
    );
  }
}

module.exports = GamePage;