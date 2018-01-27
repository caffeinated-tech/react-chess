
module.exports = function(app, Passport){

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
            return res.json({user: user.serialize()});
          }
        });
      }
    })(req, res, next);
  });

  // log the user out by destroying the session
  app.post('/api/auth/logout', function (req, res, next) {
    req.logout();
    // return an empty success response
    return res.status(204).json({});
  });
}