////////////////////////////////////////////////////////////////////////////////
// Load libraries
////////////////////////////////////////////////////////////////////////////////

// websocket for live game updates
const WebSocket = require('ws');



////////////////////////////////////////////////////////////////////////////////
// some constants to hold regularly used data in memory
////////////////////////////////////////////////////////////////////////////////

// some in memory statistics to display to users & guests
global.Statistics = {
  connections: {
    users: 0,
    guests: 0
  }
};

// top level object to hold sockets, games and users by user id for quick lookup
//  and broadcasts
global.OpenSockets = {};

////////////////////////////////////////////////////////////////////////////////
// load handlers for game logic
////////////////////////////////////////////////////////////////////////////////

let joinGame = require('./game/join_game.js');
let makeMove = require('./game/make_move.js');
let forfeitGame = require('./game/forfeit_game.js');


module.exports = function(server, sessionParser){

  // function to broadcast info to all users/guests with an open connection
  function broadcast(data) {
    WebSocketServer.clients.forEach(function each(socket) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(data));
      }
    });
  };

  // broadcast stats to all users/guests
  function broadcastUpdatedStats(){
    broadcast({
      type: 'statistics',
      payload: Statistics
    })
  };

  // setup handlers to disconnect the socket if it doesn't respond to the ping 
  //  (aka heartbeat) request sent every 30 seconds
  function registerSocketHeartbeat(socket){
    // mark the socket as alive so it won't be automatically closed again by the 
    //  heartbeat loop
    socket.isAlive = true;

    // we ping the client every 30 seconds to check if they are still there. If 
    //  not no pong response comes back within the 30 seconds, the socket will 
    //  be closed.
    socket.on('pong', function heartbeat() {
      socket.isAlive = true;
    });
  };

  function registerSocketEventHandlers(socket){
    socket.on('close', function(){
      decrementStatistics(socket);
      // TODO: if the user was in a game, what do I do here? Mark it as 
      //  forfeited? - maybe a minute counter after which the game is lost?
      if(socket.user != null){
        // remove the global reference to the socket to prevent memory leaks
        delete OpenSockets[socket.user.id];
      }
    });

    socket.on('message', function incoming(message) {
      // all websocket messages are JSON objects
      let data = JSON.parse(message);
      switch(data.type){
        case 'register':
          break;
        case 'join_game':
          joinGame(socket.user, data.payload);
          break;
        case 'make_move':
          makeMove(socket.user, data.payload);
          break;
        case 'forfeit_game':
          forfeitGame(socket.user, data.payload);
        default:
      }
    });
  };


  // keep track of the number of users/guests online
  function incrementStatistics(socket){
    if (socket.user != null){
      Statistics.connections.users += 1
    } else {
      Statistics.connections.guests += 1
    }
    broadcastUpdatedStats();
  };

  function decrementStatistics(socket){
    if (socket.user != null){
      Statistics.connections.users -= 1
    } else {
      Statistics.connections.guests -= 1
    }
    broadcastUpdatedStats();
  };


  function setupConnection(socket, req){
    // guard clause to short-circuit the user-related logic if it's a guest 
    //  connection
    if (req.session.passport == undefined || 
        req.session.passport.user == undefined){
      incrementStatistics(socket);
      registerSocketHeartbeat(socket);
      registerSocketEventHandlers(socket);
      return;
    } 

    // the user id has been decoded from the cookie by the express-session 
    //  middleware, so it can't be spoofed by the user and can be used to verify 
    //  websocket messages against.

    let userId = req.session.passport.user;
    User.findOne({ where: { id: userId }})
    .then(function(user) {
      socket.user = user;
      incrementStatistics(socket);
      registerSocketHeartbeat(socket);
      registerSocketEventHandlers(socket);

      // cache the connection object
      OpenSockets[userId] = socket;

      if (user.activeGameId == null){
        return;
      }
      // user has reconnected while they still had an active game. Go ahead
      //  and reconnect them to it
      Game.findOne({where: {id: user.activeGameId}})
      .then(function(game){
        // update the cached user connection with the game object
        socket.game = game;
        // we have a game, but to resume it we need all the moves too:
        return Move.findAll({where: {gameId: game.id}})
      })
      .then(function(moves){
        // set the moves on the game model so they can be serialized with it
        socket.game.moves = moves;

        // send the game info to the user
        let message = JSON.stringify({
          type: 'joined_game',
          payload: socket.game.serialize()
        });
        socket.send(message);
      });
    });
  };

  // Based on example from websocket repo: 
  //  https://github.com/websockets/ws/blob/master/examples/express-session-parse/index.js
  const WebSocketServer = new WebSocket.Server({
    // authorize the user against their web session
    verifyClient: function(info, done){
      sessionParser(info.req, {}, function(){
        // move on to the next handler - no requests are rejected, as even guest 
        //  users can watch games via the web socket (TODO!!)
        done(true)
      })
    },
    // by hooking the web socket server onto the same HTTP server as the client,
    //  the session from the express server can be used for auth in the 
    //  verifyClient above
    server
  });

  WebSocketServer.on('connection', setupConnection);

  // Check every 30 seconds that all clients are still connected. If any of them
  //  don't respond, then something went wrong. Just close the connection.
  setInterval(function (){
    WebSocketServer.clients.forEach(function each(socket) {
      if (socket.isAlive === false){
        socket.terminate();
      } else {
        socket.isAlive = false;
        socket.ping();
      }
    });
  }, 30000);

};