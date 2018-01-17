const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouterDom = require('react-router-dom');
const StaticRouter = ReactRouterDom.StaticRouter;
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
// pretty log formatting
const morgan = require('morgan')


// load initializers to setup database, models etc.
Database = require('./initializers/database.js')
Passport = require('./initializers/auth.js')

// to get around module loading problems (it's a compiled webpack module 
// 	so there is no export, instead the server.js file exposes a global
// 	called ServerPage)
require('../public/server.js');

const Server = express()
Server.use(express.static('public'));
Server.use(bodyParser.urlencoded({ extended: true }));
Server.use(bodyParser.json());
Server.use(session({
  secret: 'correct horse battery staple',
  resave: true, 
  saveUninitialized:true}));
Server.use(Passport.initialize());
Server.use(Passport.session());
Server.use(morgan('combined'));

// homepage is /home
Server.get('/', (req, res) => {
 res.redirect("/home");
});

// Passport offers a great middleware to handle the login using http redirects 
//  and full page refreshes. But as we have a React SPA app, an ajax JSON 
//  response would be faster and lighter
Server.post('/api/auth/signup', function (req, res, next) {

  Passport.authenticate('local', function(err, user, info) {
    if (err) { 
      // Something went wrong, this will log the problem to STDOUT and node 
      //  should return a http 500 status (internal server error) 
      //  https://httpstatuses.com/500
      return res.status(403).json({msg: 'went wrong'});
    } else if (!user) {
      // http 403 (forbidden) https://httpstatuses.com/403. Can leave the 
      //  response body as the status is enough for the form to show a generic 
      //  error.
      return res.status(403).json({msg: 'error'});
    } else { 
      // successful login - log the user in via passport middleware's login 
      //   method which is exposed on the request object
      req.login(user, function(err) {
        if (err){
          return next(err);
        } else {
          // TODO: return some user info
          return res.json({user: user.serialize()});
        }
      });
    }
  })(req, res, next);

});

// TODO: login method needed which won't create new user if they already exist

const serverSideRender = function(req,res){
  const context = {};
  const props = {
    user: req.user && req.user.serialize()
  };
  let html = ReactDOMServer.renderToString(   
    React.createElement(StaticRouter, { location: req.url, context: context },
      React.createElement(ServerPage, props)
    )
  );
  res.send(html);
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){
        return next();
    } else {
      // if they aren't redirect them to the home page
      res.redirect('/');
    }
}

Server.get('/game', isLoggedIn, serverSideRender);
Server.get('*', serverSideRender);

Server.listen(3000)