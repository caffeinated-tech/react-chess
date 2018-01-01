const Reflux = require('reflux');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');
const classNames = require('classnames')

const Game = require('./data/game.js')
const Actions = require('./actions.js')

class GameStore extends Reflux.Store {
  constructor() {
    super();
    this.game = new Game();
    this.state = {
      board: this.game.board
    };
    this.selectedPiece = null;
    this.validMoves =
    this.listenToMany(Actions);
  }

  // action callbacks

  onClickSquare(row, column, piece){
    console.log('click in store',row,column,piece);
    let newBoard = this.game.clickSquare(row, column);
    this.setState({board: newBoard});
  }

  // private methods



}
module.exports = Reflux.initStore(GameStore);