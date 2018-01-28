let Move = require('./move.js');
let User = require('./user.js');

const bcrypt   = require('bcrypt');
const Sequelize = require('sequelize');

const Game = Database.define('Game', {  
  winner: Sequelize.STRING, // white or black
  over: { 
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

// a game is related to two players
Game.belongsTo(User, {as: 'white'});
Game.belongsTo(User, {as: 'black'});

// serialize the game into an object whjch can be sent to the client for 
//  displaying game info
Game.prototype.serialize = function () {
  console.log(this);
  return {
    id: this.id,
    winner: this.winner,
    over: this.over,
    black: this.blackId,
    white: this.whiteId,
    moves: (this.moves && this.moves.map(function(move){
      return move.serialize();}) ) || []
  };
};


module.exports = Game;