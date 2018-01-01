
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
}

module.exports = Piece;