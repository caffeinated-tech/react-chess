const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouterDom = require('react-router-dom');
const StaticRouter = ReactRouterDom.StaticRouter;


module.exports = function(app){
  
  // star matches all remaining routes which don't have a matching listener
  app.get('*', function(req,res){
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
      React.createElement(StaticRouter, { location: req.url, context: {} },
        React.createElement(ServerPage, props)
      )
    );
    res.send(html);
  });
}