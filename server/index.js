const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouterDom = require('react-router-dom');
const StaticRouter = ReactRouterDom.StaticRouter;
const express = require('express');
const http = require('http');
const session = require('express-session');
const bodyParser = require('body-parser');
// pretty log formatting
const morgan = require('morgan')
// persistant session in memory & filesystem
// Installation instructions here: 
// https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis
const RedisStore = require('connect-redis')(session);
// websocket for live game updates
const WebSocket = require('ws');

 

// load initializers to setup database, models etc.
Database = require('./initializers/database.js');
Passport = require('./initializers/auth.js');

// to get around module loading problems (it's a compiled webpack module 
//  so there is no export, instead the server.js file exposes a global
//  called ServerPage)
require('../public/server.js');

const app = express();
const server = http.createServer(app);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const sessionParser = session({
  store: new RedisStore({
    url: 'redis://localhost:6379'
  }),
  secret: 'correct horse battery staple',
  resave: false
})
app.use(sessionParser);

app.use(Passport.initialize());
app.use(Passport.session());
app.use(morgan('combined'));

// homepage is /home
app.get('/', (req, res) => {
 res.redirect("/home");
});

// Passport offers a great middleware to handle the login using http redirects 
//  and full page refreshes. But as we have a React SPA app, an ajax JSON 
//  response would be faster and lighter
app.post('/api/auth/signup', function (req, res, next) {

  Passport.authenticate('local-signup', function(err, user, info) {
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

app.post('/api/auth/login', function (req, res, next) {

  Passport.authenticate('local-login', function(err, user, info) {
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

app.post('/api/auth/logout', function (req, res, next) {
  req.logout();
  return res.status(204).json({});
});
// TODO: login method needed which won't create new user if they already exist

const serverSideRender = function(req,res){
  const context = {};
  const props = {
    user: req.user && req.user.serialize()
  };

  // emulate the global routerHistory used by the client side router for 
  //  correctly highlight active links
  global.RouterHistory = {
    location: {
      pathname: req.url
    }
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

app.get('/game', isLoggedIn, serverSideRender);
app.get('*', serverSideRender);


// based on example from websocket repo: 
//  https://github.com/websockets/ws/blob/master/examples/express-session-parse/index.js
const WebSocketServer = new WebSocket.Server({
  // authorize the user against their web session
  verifyClient: function(info, done){
    console.log('Parsing session from request...')
    sessionParser(info.req, {}, function(){
      console.log('Session is parsed!', info.req.session)
      done(info.req.session.passport)
    })
  },
  server
});

WebSocketServer.on('connection', function connection(socket, req) {
  console.log('recieved connection from ' + req.session.passport.user);
  let userId = req.session.passport.user;

  User.findOne({ where: { id: userId } }).then(function(user) {
    console.log(user)
    req.session.user = user
    socket.send(user.username);
  });

  socket.on('message', function incoming(message) {
    console.log('recieved message from ' + req.session.passport.user);
    console.log('received: %s', message);
  });
});


server.listen(3000)
