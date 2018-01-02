const Piece = require('./piece.js')

class Knight extends Piece {
  constructor(color) {
    super()
    this.type = 'knight';
    this.color = color;
  }

  getValidMoves(board){
    let validMoves = [];
   
    return validMoves;
  }
}

module.exports = Knight;