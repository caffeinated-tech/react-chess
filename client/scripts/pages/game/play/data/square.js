
class Square {
  constructor(row, column, piece = null) {
    this.row = row;
    this.column = column;
    this.piece = piece;
    this.color = ((row + column) % 2 == 0) ? 'white' : 'black';
    this.validMove = false;
    this.selected = false;
    this.lastMove = false;
  }

  setPiece(piece){
  	piece.setPosition(this.row, this.column);
  	this.piece = piece;
  }

  movePieceHere(piece){
  	piece.hasMoved = true;
  	this.setPiece(piece);
  }

}

module.exports = Square;