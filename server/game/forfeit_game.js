

 // a user has given up
module.exports = function forfeitGame(user, payload){
  // grab game from cached user connection
  let game = OpenSockets[user.id].game;
  // update game with winner info
  let winner = (game.whiteId == user.id) ? 'black' : 'white';
  game.over = true;
  game.winner = winner;
  game.save()
  .then(function(){
    // send game over event to players
    let message = JSON.stringify({
      type: 'game_over', 
      payload: game.serialize()});
    OpenSockets[game.blackId].send(message);
    OpenSockets[game.whiteId].send(message);

    // clear game from user socket session
    OpenSockets[game.blackId].user.activeGameId = null;
    OpenSockets[game.blackId].user.save();
    OpenSockets[game.blackId].game = null;
    OpenSockets[game.whiteId].user.activeGameId = null;
    OpenSockets[game.whiteId].user.save();
    OpenSockets[game.whiteId].game = null;
  });
}