
const bcrypt   = require('bcrypt');
const Sequelize = require('sequelize');

const Move = Database.define('Move', {  
  password: Sequelize.STRING,
  email: Sequelize.STRING
});

module.exports = Move;