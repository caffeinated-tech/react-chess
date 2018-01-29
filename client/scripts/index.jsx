// Libraries
const React = require('react');
const Reflux = require('reflux');
const ReactDOM = require('react-dom');
const { Switch, Route, Redirect } = require('react-router-dom');

// Layout
const Header = require('./header.jsx');

// Pages
const Home = require('./pages/home.jsx')
const Auth = require('./pages/auth.jsx')
const Game = require('./pages/game.jsx')
const PageNoteFound = require('./pages/404.jsx')

// Data stores
const AuthStore = require('./pages/auth/store.js')
const PlayStore = require('./pages/game/play/store.js')
const LobbyStore = require('./pages/game/lobby/store.js')
const StatsStore = require('./common/stats/store.js')

// If executed in the browser, this will create the singleton window.socket
//  for communicating with the server via a websocket
require('./common/socket.js');

// Main app view, for choosing which page to show, and initializing data in the
//  reflux stores.
class App extends Reflux.Component {
  // The props that are passed to the App component (by both the server side 
  //  rendered and client side pages) needs to be passed to the stores which 
  //  then distribute these details to their pages
  constructor(props){
    super(props);
    this.state = {};
    this.store = AuthStore;

    AuthStore.initializeState(props);
    PlayStore.initializeState(props);
    LobbyStore.initializeState(props);
  }

  render() {
    return (
      <div id="page">
        <Header/>
        <main>
          <Switch>
            <Route path='/home' component={ Home } />
            <Route path='/auth' component={ Auth } />
            <Route path='/game' render={function(){
              return this.state.user == undefined 
              ? <Redirect to={{
                pathname: '/auth/login'
              }}/>
              : <Game/>

            }.bind(this)} />
            <Route component={PageNoteFound}/>
          </Switch>
        </main>
      </div>
    );
  }
}

module.exports = App;