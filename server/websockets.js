
const Statistics = {
  connections: {
    users: 0,
    guests: 0
  }
}
// websocket for live game updates
const WebSocket = require('ws');


function createGame(user, payload){
  
}

function joinGame(user, payload){
  
}

function makeMove(user, payload){
  
}


module.exports = function(server, sessionParser){

  // Based on example from websocket repo: 
  //  https://github.com/websockets/ws/blob/master/examples/express-session-parse/index.js
  const WebSocketServer = new WebSocket.Server({
    // authorize the user against their web session
    verifyClient: function(info, done){
      // use the 
      sessionParser(info.req, {}, function(){
        console.log('Session is parsed!', info.req.session)
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
    // let userId = req.session.passport.user;
    console.log('\n\nnew connection');
    console.log(req.session);
    console.log((req.session.passport !== undefined && req.session.passport.user !== undefined));
    if (req.session.passport !== undefined && req.session.passport.user !== undefined){
      Statistics.connections.users += 1
    } else {
      Statistics.connections.guests += 1
    }
    // TODO: broadcast number of connections to all other registered connections
    broadcast({
      type: 'statistics',
      payload: Statistics
    })

    console.log('Statistics');
    console.log(Statistics);

    // mark the socket as alive so it won't be automatically closed again by the 
    //  heartbeat loop
    socket.isAlive = true;

    // we ping the client every 30 seconds to check if they are still there. If 
    //  not no pong response comes back within the 30 seconds, the socket will 
    //  be closed.
    socket.on('pong', function heartbeat() {
      console.log('socket is still alive')
      socket.isAlive = true;
    });

    socket.on('close', function(){
      console.log('socket closed');
      if (req.session.passport !== undefined && req.session.passport.user !== undefined){
        Statistics.connections.users -= 1
      } else {
        Statistics.connections.guests -= 1
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
        case 'create_game':
          createGame(user, data.payload);
          break;
        case 'join_game':
          joinGame(user, data.payload);
          break;
        case 'make_move':
          makeMove(user, data.payload);
          break;
        default:
          console.log('unknown web socket message', message)
      }
    });
  });

  function broadcast(data) {
    console.log('broadcast');
    WebSocketServer.clients.forEach(function each(socket) {
      if (socket.readyState === WebSocket.OPEN) {
        console.log('send ', data)
        socket.send(JSON.stringify(data));
      }
    });
  };
  
  // check every 30 seconds that all clients are still connected, if any of them
  //  don't respond, then something went wrong. Just kill the process
  const interval = setInterval(function ping() {
    WebSocketServer.clients.forEach(function each(socket) {
      if (socket.isAlive === false){
        console.log('closing socket')
        socket.terminate();
      } else {
        console.log('ping socket')
        socket.isAlive = false;
        socket.ping();
      }
    });
  }, 30000);
}