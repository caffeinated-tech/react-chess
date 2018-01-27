// express is the nodejs based webserver which can handle web requests and 
//   offers a middleware based architecture
const express = require('express');
// http server for both the views & api, and the authentication for the web 
//  sockets
const http = require('http');
// logged in users are kept in a session
const session = require('express-session');
// parse post body to the api
const bodyParser = require('body-parser');
// pretty log formatting
const morgan = require('morgan')
// persistant session in memory & filesystem
// Installation instructions here: 
// https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis
const RedisStore = require('connect-redis')(session);


// load initializers to setup database, models etc.
Database = require('./initializers/database.js');
Passport = require('./initializers/auth.js');

// to get around module loading problems (it's a compiled webpack module 
//  so there is no export, instead the server.js file exposes a global
//  called ServerPage)
require('../public/server.js');

// initialize the express app and wrap it in a HTTP server for handling requests
const app = express();
const server = http.createServer(app);

// static assets (images, icons etc) are in the ./public directory
app.use(express.static('public'));

// parse both  url query params, and json post bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// the express session is stored on the server in the redis database in memory
//  and on the client it is a hashed cookie
const sessionParser = session({
  store: new RedisStore({
    url: 'redis://localhost:6379'
  }),
  secret: 'correct horse battery staple',
  resave: false
})
app.use(sessionParser);

// use the passport library for authorization which can serialize / deserialize
//  the user model into the redis session store, and offers some useful 
//  middleware for creating / authorizing the user (but I'm not using it. See
//  `routes/api.js`)
app.use(Passport.initialize());
app.use(Passport.session());
// pretty server logs
app.use(morgan('dev'));

// homepage is /home
app.get('/', (req, res) => {
 res.redirect("/home");
});

require('./routes/api.js')(app, Passport);
require('./routes/views.js')(app);
require('./websockets.js')(server, sessionParser);

// listen on port 3000 for http requests
server.listen(3000)




// Getting weird errors from time to time?
// Use for debug info `node server/index.js --abort-on-uncaught-exception`
//  https://nodejs.org/api/cli.html#cli_abort_on_uncaught_exception