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


  initializeState(props) {
    console.log('TODO: init state in game store')
  }


  // action callbacks

  onClickSquare(row, column, piece){
    console.log('click in store',row,column,piece);
    let newBoard = this.game.clickSquare(row, column);
    this.setState({board: newBoard});
  }

  onDragPiece(row, column){
    console.log('drag from',row,column);
    let newBoard = this.game.selectSquare(row, column);
    this.setState({board: newBoard});
  }

  onDropOnSquare(row, column){
    console.log('drop in store',row,column);
    let newBoard = this.game.clickSquare(row, column);
    this.setState({board: newBoard});
  }

  // private methods



}
module.exports = Reflux.initStore(GameStore);