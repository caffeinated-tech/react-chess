const Piece = require('./piece.js')

let possibleMoves = [
	[1,2],
	[1,-2],
	[-1,2],
	[-1,-2],
	[2,1],
	[2,-1],
	[-2,1],
	[-2,-1]
];

class Knight extends Piece {

  constructor(color) {
    super()
    this.type = 'knight';
    this.color = color;
  }

  getValidMoves(board){
    let validMoves = [];

    possibleMoves.forEach(function(coordinates){
    	let row = this.row + coordinates[0]
    	let column = this.column + coordinates[1]

      if(this._isOffBoard(row, column)){
        return;
      }

    	let targetPiece = board[row][column].piece;
    	// if the target is empty or an opponents piece, it is a valid move
    	if(targetPiece == null || targetPiece.color != this.color){
	    	validMoves.push([row, column]);
    	}
    }, this);
   
    return validMoves;
  }
}

module.exports = Knight;