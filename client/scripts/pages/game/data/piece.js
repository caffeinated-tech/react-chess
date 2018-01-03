
class Piece {
  constructor() {
    this.hasMoved = false;
    this.type = null;
    this.color = null;
    this.row = null;
    this.column = null;
  }

  canMoveToPositions(myPosition, board){
  	return [];
  }

  setPosition(row, column){
    this.row = row;
    this.column = column;
  }

  _isOffBoard(row, column){
    return (row < 0 || row > 7 || column < 0 || column > 7);
  }
}

module.exports = Piece;