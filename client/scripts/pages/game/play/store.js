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
    this.state = this.game;
    this.selectedPiece = null;
    this.validMoves =
    this.listenToMany(Actions);
  }

  initializeState(props) {
    // set user id if user is present
    this.userId = props.user && props.user.id;
  }

  //////////////////////////////////////////////////////////////////////////////
  // action callbacks
  //////////////////////////////////////////////////////////////////////////////

  onClickSquare(row, column, piece){
    console.log('click in store',row,column,piece);
    this.game.clickSquare(row, column);
    this.setState(this.game);
  }

  onDragPiece(row, column){
    console.log('drag from',row,column);
    this.game.selectSquare(row, column);
  }

  onDropOnSquare(row, column){
    console.log('drop in store',row,column);
    this.game.clickSquare(row, column);    this.setState(this.game);
  }

  //////////////////////////////////////////////////////////////////////////////
  // action callbacks from socket events
  //////////////////////////////////////////////////////////////////////////////

  onSetupGame(gameData) {
    this.game = new RemoteGame(gameData, this.userId);
    this.setState(this.game);
  }

  onMoveMade(moveData){
    this.game.applyMove(moveData);
    this.setState(this.game);
  }
}


module.exports = Reflux.initStore(PlayStore);