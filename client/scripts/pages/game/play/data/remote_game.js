const Game = require('./game.js');

class RemoteGame extends Game{
  constructor(gameData, userId) {
    console.log('creating a new game', gameData, userId)
    // the base game is built up by 
    super(gameData.moves);
    // me could be null (for guests) or not even a player (if a user who is 
    //  spectating)
    this.me = userId;  
    this.white = gameData.white;
    this.black = gameData.black;
    this.winner = gameData.winner;
    this.over = gameData.over;
    this.turn = this.moves.length % 2 == 0 ? 'white' : 'black';
    console.log('setup the game', this);
  }

  _myTurn(){
    console.log('is it my turn??');
    console.log('this.me', this.me);
    console.log('this.turn', this.turn);
    console.log('this[this.turn]', this[this.turn]);
    return this.me == this[this.turn];
  }

  _recordMove(from, to){
    console.log('TODO: record move to send to other player', this.me, from, to);  
    let move = {
      from: {
        column: from.column,
        row: from.row,
        piece: from.piece.type,
        color: from.piece.color
      },
      to: {
        column: to.column,
        row: to.row,
        piece: to.piece && to.piece.type,
        color: to.piece && to.piece.color
      },
    }

    this.moves.push(move);
    window.socket.makeMove(move);
    this.turn = this.moves.length % 2 == 0 ? 'white' : 'black';
  }
}

module.exports = RemoteGame;