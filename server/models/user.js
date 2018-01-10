

var bcrypt   = require('bcrypt');
const Sequelize = require('sequelize');

const User = Database.define('User', {  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING
});

// 
User.prototype.validPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// serialize the user into an object whjch can be sent to the client for 
//  displaying user info
User.prototype.serialize = function () {
  return {
    id: this.id,
    email: this.email,
    username: this.username
  };
};

// hash the password before saving
User.beforeCreate(function (user, options){
  // returning a promise
  return bcrypt.hash(user.password, 8)
    .then(function (hash){
      user.password = hash;
    })
    .catch(function (err){ 
        throw new Error(); 
    });
});

module.exports = User;