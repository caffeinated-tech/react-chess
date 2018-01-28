const Reflux = require('reflux');

var GameActions = Reflux.createActions({
  'clickSquare': {},
  'dragPiece': {},
  'dropOnSquare': {}
});

module.exports = GameActions;