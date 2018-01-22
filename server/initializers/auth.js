
// Authorization for creating & logging in as local users. 
// Based on a great tutorial by scotch.io: 
//  https://scotch.io/tutorials/easy-node-authentication-setup-and-local
const Sequelize = require('sequelize');
const Passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

// create a user with username & password
function signup(username, password, done){
  User.findOne({ where: { username: username } }).then(function(user) {
    console.log('signup... user', user);
    // if no user was found with this username, we can safely create a new user
    if (!user) {
      return User.create({username: username, password: password})
        .then(function(newUser, created) {
          if (!newUser) {
            return done(null, false);
          } else {
            return done(null, newUser);
          }
        });
    } else {
      // user already exists, can't create another with the same username
      return done(null, false);
    }
  });
};

// authenticate a user via username & password
function login(username, password, done){
  User.findOne({ where: { username: username } }).then(function(user) {
    if (!user) {
      // if no user was found, return a generic error.
      return done(null, false);
    } else if (user.validPassword(password)) {
      // if the user was found, check the password to try and log them in.
      // valid password, log them in by returning the user
      return done(null, user);
    } else {
      // invalid password, don't log them in by returning false
      return done(null, false);
    }
  });
};

Passport.use('local-signup',new LocalStrategy(signup));
Passport.use('local-login',new LocalStrategy(login));

// How we serialize the user into a session store (eg cookie) - just use the 
//  user id as this is enough to load the user object from again.
Passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user from a session store.
Passport.deserializeUser(function(id, done) {
  User.findById(id).then(function(user) {
    done(null, user);
  });
});

module.exports = Passport
 