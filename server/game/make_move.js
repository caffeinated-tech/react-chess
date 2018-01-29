

 // a user has tried to make a move via the websocket, validate it and send it 
 //   to the other player
module.exports = function makeMove(user, payload){
  // grab game from cached user connection
  let game = OpenSockets[user.id].game;

  Move.count({ where: { gameId: game.id } }).then(function(count){
    // even move means it's white's turn, odd is black's turn (starting at 0)
    let turn = (count % 2 == 0) ? 'white' : 'black';
    // check if it's my turn
    let myTurn = game[turn + 'Id'] == user.id;
    // validation - the user is messing with the game, ignore the request
    if(!myTurn || turn != payload.from.color){
      return;
    }
    // create a new move and save it
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
      // get the other player's id so we can notify them of the move
      let otherPlayerId = (turn == 'white') ? game.blackId : game.whiteId;

      let message = JSON.stringify({
        type: 'made_move', 
        payload: move.serialize()});
      OpenSockets[otherPlayerId].send(message);
      // TODO: broadcast move to any spectators?
    });
  });
}