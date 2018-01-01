const Piece = require('./piece.js')

class Pawn extends Piece {
  constructor(color) {
    super()
    this.type = 'pawn';
    this.color = color;
  }

  getValidMoves(board){
    let validMoves = [];
    // what direction is the pawn moving in along the board? (1 = down, -1 = up)
    let direction = this.color == 'white' ? -1 : 1;
    // straight ahead
    let straightAheadPiece = board[this.row + direction][this.column].piece;
    if(straightAheadPiece == null){
      validMoves.push([this.row + direction, this.column]);
    }

    // diagonally to the left if there is an enemy
    if(this.column != 0){
      let diagonalLeftPiece = board[this.row + direction][this.column - 1].piece;
      if(diagonalLeftPiece != null && diagonalLeftPiece.color != this.color){
        validMoves.push([this.row + direction, this.column - 1]);
      }
    }
    // diagonally to the left if there is an enemy
    if(this.column != 7){
      let diagonalLeftPiece = board[this.row + direction][this.column + 1].piece;
      if(diagonalLeftPiece != null && diagonalLeftPiece.color != this.color){
        validMoves.push([this.row + direction, this.column + 1]);
      }
    }
    // on it's first move a pawn can move two squares forwards
    if(!this.hasMoved){
      let straightAhead2Piece = board[this.row + (direction * 2)][this.column].piece;
      if(straightAhead2Piece == null){
        validMoves.push([this.row + (direction * 2), this.column]);
      }
    }
    return validMoves;
  }
}

module.exports = Pawn;