
// some in memory statistics to display to users & guests
const Statistics = {
  connections: {
    users: 0,
    guests: 0
  }
}

// top level object to hold sockets, games and users by user id for quick lookup
//  and broadcasts
const Connections = {

};

// if there is an open game waiting for another player, then it's kept in this
//  variable in memory to save lookup time
let openGame = null;

// websocket for live game updates
const WebSocket = require('ws');


function joinGame(user, payload){
  // only logged in users can play
  if( user === null){
    return;
  }

  let gameId = payload.id;

  if( gameId === null){
    // join the open game or start a new game
    if( openGame === null){
      openGame = new Game({});
      openGame.setWhite(user);
      openGame.save(); // no need to wait for promise, as there is nothing to do
      // on save
    } else {
      openGame.setBlack(user);
      openGame.save()
      .then(function(game){


        let message = JSON.stringify({
          type: 'joined_game',
          payload: game.serialize()
        })

        // save the activeGame id to the two users so they can resume it if the 
        //  connection drops
        Connections[game.blackId].user.activeGameId = game.id;
        Connections[game.blackId].user.save();
        Connections[game.whiteId].user.activeGameId = game.id;
        Connections[game.whiteId].user.save();
        // send a message to both players that they have joined the game
        Connections[game.blackId].socket.send(message);
        Connections[game.whiteId].socket.send(message);
      });
    }
  } else {
    // check if there is a space free in the game with the given id
  } 
}

function makeMove(user, payload){
  let game = Connections[user.id].game;
  Move.count({where:{gameId: game.id}}).then(function(count){
    let turn = (count % 2 == 0) ? 'white' : 'black';
    let myTurn = game[turn + 'Id'] == user.id;
    // validation - the user is messing with the game, ignore the request
    if(!myTurn || turn != payload.from.color){
      return;
    }
    let move = new Move({
      userId: user.id,
      gameId: game.id,
      fromColumn: payload.from.column,
      fromRow: payload.from.row,
      fromPiece: payload.from.piece,
      fromColor: payload.from.color,
      toColumn: payload.to.column,
      toRow: payload.to.row,
      toPiece: payload.to.piece,
      toColor: payload.to.color
    })
    move.save().then(function(result){
      let otherPlayerId = (turn == 'white') ? game.blackId : game.whiteId;
      let message = JSON.stringify({
        type: 'made_move', 
        payload: move.serialize()});
      Connections[otherPlayerId].socket.send(message);
      // TODO: broadcast move to any spectators?
    });
  });
}


module.exports = function(server, sessionParser){

  // Based on example from websocket repo: 
  //  https://github.com/websockets/ws/blob/master/examples/express-session-parse/index.js
  const WebSocketServer = new WebSocket.Server({
    // authorize the user against their web session
    verifyClient: function(info, done){
      // use the 
      sessionParser(info.req, {}, function(){
        // move on to the next handler - no requests are rejected, as even guest 
        //  users can watch games via the web socket
        done(true)
      })
    },
    // by hooking the web socket server onto the same HTTP server as the client,
    //  the session from the express server can be used for auth in the 
    //  verifyClient above
    server
  });

  WebSocketServer.on('connection', function connection(socket, req) {
    // the user id has been decoded from the cookie by the express-session 
    //  middleware, so it can't be spoofed by the user and can be used to verify 
    //  websocket messages against.
    let user = null;
    if (req.session.passport !== undefined && req.session.passport.user !== undefined){
      Statistics.connections.users += 1

      let userId = req.session.passport.user;

      User.findOne({ where: { id: userId }}).then(function(result) {
        user = result;

        // keep regularly used data in memory so we don't have to fetch it as 
        //  often
        Connections[userId] = {
          socket: socket,
          user: user,
          game: null 
        };
        if (user.activeGameId != null){
          // user has reconnected while they still had an active game. Go ahead
          //  and reconnect them to it
          Game.findOne({where: {id: user.activeGameId}}).then(function(game){
            Move.findAll({where: {gameId: game.id}}).then(function(moves){
              game.moves = moves;
              let message = JSON.stringify({
                type: 'joined_game',
                payload: game.serialize()
              });
              // cache the game object;
              Connections[userId].game = game;
              socket.send(message);
            });
          });
        }

      });

    } else {
      Statistics.connections.guests += 1
    }
    // TODO: broadcast number of connections to all other registered connections
    broadcast({
      type: 'statistics',
      payload: Statistics
    })


    // mark the socket as alive so it won't be automatically closed again by the 
    //  heartbeat loop
    socket.isAlive = true;

    // we ping the client every 30 seconds to check if they are still there. If 
    //  not no pong response comes back within the 30 seconds, the socket will 
    //  be closed.
    socket.on('pong', function heartbeat() {
      socket.isAlive = true;
    });

    socket.on('close', function(){
      if (req.session.passport !== undefined && req.session.passport.user !== undefined){
        Statistics.connections.users -= 1;
      } else {
        Statistics.connections.guests -= 1;
      }
      // TODO: persist some data about the user/guest here? eg. last session
      // TODO: if the user was in a game, what do I do here? Mark it as 
      //  forfeited? - maybe a minute counter after which the game is lost?
    });

    // TODO: set timeout to send ping messages to see if users are still around
    socket.on('message', function incoming(message) {
      // all websocket messages are JSON objects
      let data = JSON.parse(message);
      switch(data.type){
        case 'register':
          break;
        case 'join_game':
          joinGame(user, data.payload);
          break;
        case 'make_move':
          makeMove(user, data.payload);
          break;
        default:
      }
    });
  });

  function broadcast(data) {
    WebSocketServer.clients.forEach(function each(socket) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(data));
      }
    });
  };
  
  // check every 30 seconds that all clients are still connected, if any of them
  //  don't respond, then something went wrong. Just kill the process
  const interval = setInterval(function ping() {
    WebSocketServer.clients.forEach(function each(socket) {
      if (socket.isAlive === false){
        socket.terminate();
      } else {
        socket.isAlive = false;
        socket.ping();
      }
    });
  }, 30000);
}