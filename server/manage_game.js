module.exports = function(){
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

  // a user has tried to make a move via the websocket
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
}
