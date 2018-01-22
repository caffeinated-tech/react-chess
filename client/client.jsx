const React = require('react');
const ReactDOM = require('react-dom');
const { Router } = require('react-router-dom');
const createHistory = require('history/').createBrowserHistory;


// this requires jquery - let's leave it for now
// require('./scripts/materialize');

const App = require('./scripts/index.jsx');

// global history object for changing routes
window.RouterHistory = createHistory();

// styling can only be loaded in the client version as the webpacker loaders
//  related to stylesheets require browser context
require('./styles/index.scss');

// We pull the initial props for the stores out of the meta tag rendered by the 
//  server side react, so that the same props are passed to the App component
//  in both the server and client render
let propsJSON = document.head.querySelector("meta[name=props]").content
let props = JSON.parse(propsJSON);

function run(){
  ReactDOM.hydrate(
      <Router history={RouterHistory}>
        <App {...props} />
      </Router>
    , document.querySelector('#app-mount'));
}


window.addEventListener('DOMContentLoaded', run, false);