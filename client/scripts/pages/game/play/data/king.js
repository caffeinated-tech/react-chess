const Piece = require('./piece.js')

let possibleMoves = [
  [1,1],
  [1,-1],
  [-1,1],
  [-1,-1],
  [1,0],
  [-1,0],
  [0,1],
  [0,-1]
];

class King extends Piece {
  constructor(color) {
    super()
    this.type = 'king';
    this.color = color;
  }

  getValidMoves(board){
    let validMoves = [];

    possibleMoves.forEach(function(coordinates){
      let row = this.row + coordinates[0]
      let column = this.column + coordinates[1]

      // remove any moves which would result in the piece moving off the 
      //   board
      if(row < 0 || row > 7 || column < 0 || column > 7){
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

module.exports = King;