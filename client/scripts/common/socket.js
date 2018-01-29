
// load actions to communicate with Reflux stores
const StatsActions = require('./stats/actions.js')
const PlayActions = require('../pages/game/play/actions.js')

// Global singleton socket class for managing communications with the server
//  via sockets for joining games and showing stats


// only setup socket in the client, not during server side rendering
if (typeof window !== 'undefined') { 

  // Good documentation on web sockets: 
  //  https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
  class Socket {
    constructor(){
      this.socket = this._openSocket()
    }

    restartSocket(){
      this.socket.close();
      this.socket = this._openSocket()
    }

    ////////////////////////////////////////////////////////////////////////////
    // methods for sending messages to the server
    ////////////////////////////////////////////////////////////////////////////

    // Try joinging a game - if no id argument is supplied, then this will 
    //  default to joining the first open game which is available with another 
    //  player
    joinGame(id = null){
      this._sendJSON('join_game', { id: id });
    }

    // Make a move for the current game by sending it to the server which will 
    //  then pass the info onto the other player
    makeMove(move){
      this._sendJSON('make_move', move);
    }

    forfeitGame(){
      this._sendJSON('forfeit_game', {}); 
    }

    ////////////////////////////////////////////////////////////////////////////
    // private methods (not really private, but using the convention to prefix
    //  methods with an underscore to mark them as private )
    ////////////////////////////////////////////////////////////////////////////

    // when a message arrives form the server, it's data payload needs to be 
    //  parsed and the data will be distributed to various stores
    _handleIncomingMessage(event) {
      console.log(event)
      let data = JSON.parse(event.data);
      switch(data.type){
        case 'statistics':
          this._updateStatistics(data.payload);
          break;
        case 'joined_game':
          this._joinedGame(data.payload);
          break;
        case 'made_move':
          this._madeMove(data.payload);
          break;
        case 'game_over':
          this._gameOver(data.payload);
          break;
      }
    }

    // The statistics live in their own store and can be displayed anywhere in 
    //  the app
    _updateStatistics(payload) {
      StatsActions.updateStats(payload);
    }

    _joinedGame(payload){
      PlayActions.setupGame(payload);
      RouterHistory.push('/game/play/' + payload.id);
      // TODO: show some sort of toast / popup
    }

    _madeMove(payload){
      PlayActions.moveMade(payload);
    }

    _gameOver(payload){
      RouterHistory.push('/game/lobby');
      // TODO: inform the players who won
      // TODO: clear the game object from the play store
      // Todo: prevent the user from accessing the play view when no game is 
      //  there
    }

    _openSocket(){
      // websocket server is running on the same host and port
      //  as the http server
      let socket = new WebSocket('ws://' + window.location.host);
      socket.onopen = function open() {
        // TODO: do we need to send / receive any info here?
      };

      socket.onmessage = this._handleIncomingMessage.bind(this);
      return socket;
    }

    _sendJSON(type, payload){
      this.socket.send(JSON.stringify({
        type: type,
        payload: payload
      }))
    }
  }
  
  window.socket = new Socket()
}