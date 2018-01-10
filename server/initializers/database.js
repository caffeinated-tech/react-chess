// initialize database connection
const Sequelize = require('sequelize');
Database = new Sequelize('react-chess', null, null, {
    dialect: "sqlite",
    storage: './server/data/development.sqlite',
});

Database
  .authenticate()
  .then(function(err) {
    console.log('Connected to Sqlite DB.');
  })
  .catch(function (err) {
    console.log('Error connecting to DB:', err);
  });

// load models
global.User = require('../models/user.js');

Database.sync()
  .then(function(err) {
    console.log('Tables synced!');
  })
  .catch(function (err) {
    console.log('Error syncing tables:', err);
  });

module.exports = Database;