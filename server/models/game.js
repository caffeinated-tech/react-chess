

var bcrypt   = require('bcrypt');
const Sequelize = require('sequelize');

const Game = Database.define('Game', {  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  : Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING
});


module.exports = Game;