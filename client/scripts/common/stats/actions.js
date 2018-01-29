const Reflux = require('reflux');

// actions for updating the stats store from any view component or none react / 
//  reflux entity.

var StatsActions = Reflux.createActions({
  'updateStats': {} // to be called when new stats arrive over the socket
});

module.exports = StatsActions;