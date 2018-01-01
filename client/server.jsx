const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./scripts/index.jsx');

class ServerPage extends React.Component {
  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta name="author" content="liam@caffeinated.tech"/>
          <link rel="icon" href="images/favicon.png"/>
          <link href="https://fonts.googleapis.com/css?family=Fira+Sans" rel="stylesheet"/>
          <title> 
            React-Chess
          </title>
        </head>
        <body>
          <div id="background">
          </div>
          <div id="app-mount">
            <App></App>
          </div>
          <script src="client.js"></script>
        </body>
      </html>
    );
  }
}

global.ServerPage = ServerPage

module.exports = ServerPage;