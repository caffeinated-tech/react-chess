// Libraries
const React = require('react');
const ReactDOM = require('react-dom');
const { Switch, Route } = require('react-router-dom');

// Layout
const Header = require('./header.jsx');

// Pages
const Home = require('./pages/home.jsx')
const Auth = require('./pages/auth.jsx')
const Game = require('./pages/game.jsx')

// Data stores
const AuthStore = require('./pages/auth/store.js')
const GameStore = require('./pages/game/store.js')

// 404 page not found page
// TODO: move to separate page, add some useful links?
class NoMatch extends React.Component {
   render() {
      return (
        <div>
          404 not found
        </div>
      );
   }
}


// TODO: need some sort of communication class / store for managing interaction 
//  with the server. It needs to be global is it will be used in many places, 
//  and I want logged in users and guests to have a session for viewing games 
//  and interacting.
if (typeof window !== 'undefined') { 
  // Good documentation on web sockets: 
  //  https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
  class Socket {
    constructor(){
      this.socket = this._openSocket()
    }


    restartSocket(){
      this.socket.close();
      this.socket = this._openSocket()
    }

    // private methods (not really private, but using the convention to prefix
    //  methods with an underscore to mark them as private )

    _handleIncomingMessage(event) {
      console.log(event)
      console.log("from socket");
      console.log("raw",event.data);
      console.log("parsed", JSON.parse(event.data));
    }

    _openSocket(){
      // websocket server is running on the same host and port
      //  as the http server
      let socket = new WebSocket('ws://' + window.location.host);
      socket.onopen = function open() {
        // TODO: do we need to send / receive any info here?
      };

      socket.onmessage = this._handleIncomingMessage
      return socket;
    }
  }
  
  window.socket = new Socket()
}

// Main app view, for choosing which page to show, and initializing data in the
//  reflux stores.
class App extends React.Component {
  // The props that are passed to the App component (by both the server side 
  //  rendered and client side pages) needs to be passed to the stores which 
  //  then distribute these details to their pages
  constructor(props){
    super(props);
    AuthStore.initializeState(props);
    GameStore.initializeState(props);
  }

  render() {
    return (
      <div id="page">
        <Header/>
        <main>
          <Switch>
            <Route path='/home' component={ Home } />
            <Route path='/auth' component={ Auth } />
            <Route path='/game' component={ Game } />
            <Route component={NoMatch}/>
          </Switch>
        </main>
      </div>
    );
  }
}

module.exports = App;