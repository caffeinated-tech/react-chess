const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouterDom = require('react-router-dom');
const StaticRouter = ReactRouterDom.StaticRouter;
const express = require('express');
// to get around module loading problems (it's a compiled webpack module 
// 	so there is no export, instead the server.js file exposes a global
// 	called ServerPage)
require('../public/server.js');

const Server = express()
Server.use(express.static('public'))

// homepage is /home
Server.get('/', (req, res) => {
 res.redirect("/home");
});

Server.get('*', (req, res) => {
	console.log('Get request made to:' + req.url);
	console.log('\n\n\n\nStaticRouter', StaticRouter);
	console.log('\n\n\n\nServerApp', ServerPage);
	const context = {};

	let html = ReactDOMServer.renderToString(
		React.createElement(StaticRouter, { location: req.url, context: context },
			React.createElement(ServerPage)
		)
	);
	res.send(html);
});


Server.listen(3000)