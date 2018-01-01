const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom')

// this requires jquery - let's leave it for now
// require('./scripts/materialize');

const App = require('./scripts/index.jsx');

// styling can only be loaded in the client version as the webpacker loaders
//  related to stylesheets require browser context
require('./styles/index.scss');

function run(){
  ReactDOM.hydrate(
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    , document.querySelector('#app-mount'));
}


window.addEventListener('DOMContentLoaded', run, false);