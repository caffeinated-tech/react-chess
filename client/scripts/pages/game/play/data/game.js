const Pawn = require('./pawn.js');
const Rook = require('./rook.js');
const Knight = require('./knight.js');
const Bishop = require('./bishop.js');
const Queen = require('./queen.js');
const King = require('./king.js');
const Square = require('./square.js');

// The chess board will be represented as an array of 8 rows (arrays), each
// containing 8 squares. The squares can contain pieces and other metadata
class Game {
  constructor(moves) {
  	// setup board & pieces
    this.board = [];
    this._setupEmptyBoard();
    this.moves = [];
    this._setupPieces();
    // some metadata for handling moves
    this.selectedSquare = null
    this.turn = 'white';
    this._replayMoves(moves);
    // TODO: replay moves to get to current game state
  }

  // in a default local game, both players make the moves in this view
  _myTurn(){
    return true;
  }

  // in a default local game, no need to record moves
  _recordMove(){
  }

  // select a square for a drag start event
  selectSquare(row, column){
    if (!this._myTurn()){
      return this.board;
    }

    this.clearHighlightedSquares();
    let targetSquare = this.board[row][column];
    this.selectedSquare = targetSquare;
    // calculate and mark valid squares this piece can  move to
    let moves = targetSquare.piece.getValidMoves(this.board);
    moves.forEach(function(coordinates){
      this.board[coordinates[0]][coordinates[1]].validMove = true;
    }, this);
    return this.board;
  };

  // interacting with the game
  clickSquare(row, column){
  	let targetSquare = this.board[row][column];
    
		if(this.selectedSquare == null && targetSquare.piece == null){
      // Do nothing, as the square is empty and no piece was selected
		} else if(this.selectedSquare == null){
      if(targetSquare.piece.color == this.turn){
  			this.selectSquare(row, column);
      }
		} else if(targetSquare.validMove){
      // record move before it is completed, so we know what piece, if any, was 
      //  taken
      this._recordMove(this.selectedSquare, targetSquare);
      targetSquare.movePieceHere(this.selectedSquare.piece);
			// this should clear the piece away from the square as it's a reference to the
			// 	same object in the board
			this.selectedSquare.piece = null;
			this.selectedSquare = null;
			// remove previous highlighting, highlight target square as just moved
			this.clearHighlightedSquares();
			targetSquare.lastMove = true
			// todo: record the move
		} else {
			// clicked on a non-valid piece, so clear the highlighting from it.
			this.selectedSquare = null;
			this.clearHighlightedSquares();
			// if it was another of my pieces, highlight it instead by calling this 
			// 	method again
			if(targetSquare.piece != null){
				// todo: check if mine
				return this.clickSquare(row, column);
			}
		}
		return this.board;
  }

  clearHighlightedSquares(){
  	this.board.forEach(function(row){
  		row.forEach(function(square){
  			square.validMove = false;
  			square.lastMove = false;
  			square.selected = false;
  		});
  	});
  }

  // private methods

  _setupEmptyBoard() {
  	[0,1,2,3,4,5,6,7].forEach(function(row){
		  this.board[row] = this._createRow(row);
		}, this);
  }

  _setupPieces(){
    this.board[0][0].setPiece(new Rook('black'));
    this.board[0][1].setPiece(new Knight('black'));
    this.board[0][2].setPiece(new Bishop('black'));
    this.board[0][3].setPiece(new Queen('black'));
    this.board[0][4].setPiece(new King('black'));
    this.board[0][5].setPiece(new Bishop('black'));
    this.board[0][6].setPiece(new Knight('black'));
    this.board[0][7].setPiece(new Rook('black'));

    this.board[1][0].setPiece(new Pawn('black'));
    this.board[1][1].setPiece(new Pawn('black'));
    this.board[1][2].setPiece(new Pawn('black'));
    this.board[1][3].setPiece(new Pawn('black'));
    this.board[1][4].setPiece(new Pawn('black'));
    this.board[1][5].setPiece(new Pawn('black'));
    this.board[1][6].setPiece(new Pawn('black'));
    this.board[1][7].setPiece(new Pawn('black'));

    this.board[6][0].setPiece(new Pawn('white'));
    this.board[6][1].setPiece(new Pawn('white'));
    this.board[6][2].setPiece(new Pawn('white'));
    this.board[6][3].setPiece(new Pawn('white'));
    this.board[6][4].setPiece(new Pawn('white'));
    this.board[6][5].setPiece(new Pawn('white'));
    this.board[6][6].setPiece(new Pawn('white'));
    this.board[6][7].setPiece(new Pawn('white'));
    this.board[7][0].setPiece(new Rook('white'));
    
    this.board[7][1].setPiece(new Knight('white'));
    this.board[7][2].setPiece(new Bishop('white'));
    this.board[7][3].setPiece(new Queen('white'));
    this.board[7][4].setPiece(new King('white'));
    this.board[7][5].setPiece(new Bishop('white'));
    this.board[7][6].setPiece(new Knight('white'));
    this.board[7][7].setPiece(new Rook('white'));
  }

  _replayMoves(moves){
    if(moves == null){
      return
    }
    moves.forEach(function(move){
      this.applyMove(move);
    }.bind(this));
    console.log('it\'s ' + this.turn + ' turn' );
  }

  applyMove(move){
    console.log('apply Move', move);
    // find the squares
    let fromSquare = this.board[move.fromRow][move.fromColumn];
    let toSquare = this.board[move.toRow][move.toColumn];
    // make the move
    toSquare.movePieceHere(fromSquare.piece);
    fromSquare.piece = null;
    // some display stuff
    this.clearHighlightedSquares();
    toSquare.lastMove = true;
    // add move to history
    this.moves.push(move);
    this.turn = this.moves.length % 2 == 0 ? 'white' : 'black';
    // todo need to handle special moves here
  }

  _createRow(row){
  	let result = [];
  	[0,1,2,3,4,5,6,7].forEach(function(column) {
		  result.push(new Square(row, column));
		});
		return result;
  }

  _createEvenRow(){
  	return [
  		new Square('black'),
  		new Square('white'),
  		new Square('black'),
  		new Square('white'),
  		new Square('black'),
  		new Square('white'),
  		new Square('black'),
  		new Square('white')
  	];
  }
}

module.exports = Game;