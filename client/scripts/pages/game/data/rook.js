const Piece = require('./piece.js')

class Rook extends Piece {
  constructor(color) {
    super()
    this.type = 'rook';
    this.color = color;
  }

  getValidMoves(board){
    let validMoves = [];
   
    return validMoves;
  }
}

module.exports = Rook;