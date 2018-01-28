const Reflux = require('reflux');

var LobbyActions = Reflux.createActions({
  'clickSquare': {},
  'dragPiece': {},
  'dropOnSquare': {}
});

module.exports = LobbyActions;