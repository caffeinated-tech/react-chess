
// if there is an open game waiting for another player, then it's kept in this
//  variable in memory to save lookup time when another player comes along
let openGame = null;

module.exports = function joinGame(user, payload){
  // only logged in users can play
  if( user === null){
    return;
  }

  let gameId = payload.id;
  // if the user just want's to join any game, not a specific one
  if( gameId === null){
    // join the open game or start a new game
    if( openGame === null){
      // create a new open game
      openGame = new Game({});
      // set user as the white player
      openGame.setWhite(user);
      // save the game
      openGame.save();
      // cache the game on the user's open socket object
      OpenSockets[user.id].game = openGame;
    } else {
      // There already is a user waiting in an open game, so add this user
      //  to the same game and return it
      openGame.setBlack(user);
      OpenSockets[user.id].game = openGame;
      openGame.save()
      .then(function(game){
        // save the activeGame id to the two users so they can resume it if the 
        //  connection drops
        OpenSockets[game.blackId].user.activeGameId = game.id;
        OpenSockets[game.blackId].user.save();
        OpenSockets[game.whiteId].user.activeGameId = game.id;
        OpenSockets[game.whiteId].user.save();

        // prepare game info to send to the users
        let message = JSON.stringify({
          type: 'joined_game',
          payload: game.serialize()
        })

        // send a message to both players that they have joined the game
        OpenSockets[game.blackId].send(message);
        OpenSockets[game.whiteId].send(message);
      });
    }
  } else {
    // TODO: check if there is a space free in the game with the given id
  } 
}
