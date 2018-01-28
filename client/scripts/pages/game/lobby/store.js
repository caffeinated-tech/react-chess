const Reflux = require('reflux');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');
const classNames = require('classnames')

const Actions = require('./actions.js')

class LobbyStore extends Reflux.Store {
  constructor() {
    super();
    this.statistics = {};
    this.state = {
      statistics: this.statistics
    };
    this.listenToMany(Actions);
  }

  updateStatistics(statistics) {
    this.statistics = statistics;
    this.setState({ statistics: this.statistics });
  }

  initializeState(props){
    console.log('todo initialize state in lobbystore', props)
  }
}

module.exports = Reflux.initStore(LobbyStore);
