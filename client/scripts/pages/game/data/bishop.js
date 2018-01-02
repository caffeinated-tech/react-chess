const Piece = require('./piece.js')

class Bishop extends Piece {
  constructor(color) {
    super()
    this.type = 'bishop';
    this.color = color;
  }

  getValidMoves(board){
    let validMoves = [];
   
    return validMoves;
  }
}

module.exports = Bishop;