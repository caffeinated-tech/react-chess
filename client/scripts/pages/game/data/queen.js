const Piece = require('./piece.js')

class Queen extends Piece {
  constructor(color) {
    super()
    this.type = 'queen';
    this.color = color;
  }

  getValidMoves(board){
    let validMoves = [];
   
    return validMoves;
  }
}

module.exports = Queen;