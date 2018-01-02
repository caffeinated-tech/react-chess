const Piece = require('./piece.js')

class King extends Piece {
  constructor(color) {
    super()
    this.type = 'king';
    this.color = color;
  }

  getValidMoves(board){
    let validMoves = [];
   
    return validMoves;
  }
}

module.exports = King;