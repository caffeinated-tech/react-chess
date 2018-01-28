const Reflux = require('reflux');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');
const classNames = require('classnames')

// This store is updated with statistics via the websockets and then distributed 
//  to any stat views.
class StatsStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {};
  }

  updateStatistics(statistics) {
    this.setState(statistics);
  }
}

module.exports = Reflux.initStore(StatsStore);
