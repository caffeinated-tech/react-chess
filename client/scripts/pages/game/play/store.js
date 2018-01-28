const Reflux = require('reflux');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');
const classNames = require('classnames')

const Game = require('./data/game.js')
const RemoteGame = require('./data/remote_game.js')
const Actions = require('./actions.js')

class PlayStore extends Reflux.Store {
  constructor() {
    super();
    this.game = new Game();
    this.userId = null;
    this.state = {
      board: this.game.board
    };
    this.selectedPiece = null;
    this.validMoves =
    this.listenToMany(Actions);
  }

  initializeState(props) {
    this.userId = props.user.id;
  }

  setupGame(gameData) {
    console.log('gameData', gameData);
    this.game = new RemoteGame(gameData, this.userId);
    this.setState({board: this.game.board});
  }

  moveMade(moveData){
    this.game.applyMove(moveData);
    this.setState({board: this.game.board});
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
module.exports = Reflux.initStore(PlayStore);