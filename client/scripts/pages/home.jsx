const React = require('react');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');

const PlayerStats = require('../common/stats/players.jsx')
const Board = require('./game/play/board.jsx');
const Game = require('./game/play/data/game.js');


class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.fakeBoard = new Game();
  }

  render() {
    return (
      <div className="pure-g">
        <div className="pure-u-1" id="hero">
          <div>
            <h1>React Chess</h1>
            <p>
              Open-Source online chess game built in ReactJS
            </p>
          </div>
        </div>
        <div className="pure-u-1 pure-u-md-1-3 tall">
          <PlayerStats/>
        </div>
        <div className="pure-u-1 pure-u-md-1-3 tall">
          <div className="stats">
            How does it work? 
            <br/>
            Check out the source code on 
            <a href="https://github.com/caffeinated-tech/react-chess">Github</a>!
          </div>
        </div>
        <div className="pure-u-1 pure-u-md-1-3 tall">
          <div className="stats">
            <Board {...this.fakeBoard}/>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = HomePage;