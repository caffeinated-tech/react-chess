const Reflux = require('reflux');

var PlayActions = Reflux.createActions({
  'clickSquare': {},
  'dragPiece': {},
  'dropOnSquare': {},
  'setupGame': {},
  'moveMade': {}
});

module.exports = PlayActions;