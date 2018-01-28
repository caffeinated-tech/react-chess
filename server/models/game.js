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

// each game has many moves
Game.hasMany(Move);

// serialize the game into an object whjch can be sent to the client for 
//  displaying game info
Game.prototype.serialize = function () {
  return {
    id: this.id,
    winner: this.winner,
    over: this.over,
    black: this.black && this.black.id,
    white: this.white && this.white.id
  };
};


module.exports = Game;