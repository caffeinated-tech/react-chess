const React = require('react');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');

const Header = require('./header.jsx');
const Home = require('./pages/home.jsx')
const Auth = require('./pages/auth.jsx')
const Game = require('./pages/game.jsx')



class NoMatch extends React.Component {
   render() {
      return (
        <div>
          404 not found
        </div>
      );
   }
}

class App extends React.Component {
   render() {
    return (
      <div id="page">
        <Header/>
        <main>
          <Switch>
            <Route exact path='/home' component={ Home } />
            <Route exact path='/login' component={ Auth } />
            <Route exact path='/game' component={ Game } />
            <Route component={NoMatch}/>
          </Switch>
        </main>
      </div>
    );
  }
}

module.exports = App;