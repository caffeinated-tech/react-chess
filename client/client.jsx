const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom')

// this requires jquery - let's leave it for now
// require('./scripts/materialize');

const App = require('./scripts/index.jsx');

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
      <BrowserRouter>
        <App {...props} />
      </BrowserRouter>
    , document.querySelector('#app-mount'));
}


window.addEventListener('DOMContentLoaded', run, false);