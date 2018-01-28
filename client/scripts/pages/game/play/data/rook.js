const Piece = require('./piece.js')

let possibleMoves = [
  [1,0],
  [0,1],
  [0,-1],
  [-1,0]
];

class Rook extends Piece {
  constructor(color) {
    super()
    this.type = 'rook';
    this.color = color;
  }

  getValidMoves(board){
    let validMoves = [];

    possibleMoves.forEach(function(coordinates){
      for(var i = 1; i < 7; i++){
        let row = this.row + coordinates[0]*i;
        let column = this.column + coordinates[1]*i;

        if(this._isOffBoard(row, column)){
          return;
        }

        let targetPiece = board[row][column].piece;
        // if the target is empty or an opponents piece, it is a valid move
        if(targetPiece == null){
          validMoves.push([row, column]);

          // if it's not an empty square, stop going in this direction as the
          //  bishop cannot jump pieces
        } else if (targetPiece.color != this.color){
          validMoves.push([row, column]);
          return;
        } else {
          return;
        }
      }
    }, this);

    return validMoves;
  }
}
module.exports = Rook;