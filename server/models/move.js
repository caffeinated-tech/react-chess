
const bcrypt   = require('bcrypt');
const Sequelize = require('sequelize');

const Move = Database.define('Move', {  
  userId: Sequelize.INTEGER,
  gameId: Sequelize.INTEGER,
  fromColumn: Sequelize.INTEGER,
  fromRow: Sequelize.INTEGER,
  fromPiece: Sequelize.STRING,
  fromColor: Sequelize.STRING,
  toColumn: Sequelize.INTEGER,
  toRow: Sequelize.INTEGER,
  toPiece: Sequelize.STRING,
  toColor: Sequelize.STRING,
  check: Sequelize.BOOLEAN,
  enPassant: Sequelize.BOOLEAN,
  castling: Sequelize.BOOLEAN,
  enPassant: Sequelize.BOOLEAN,
  promotion: Sequelize.STRING,
});

// serialize the move into an object which can be sent to the client
Move.prototype.serialize = function () {
  console.log(this);
  return {
    userId: this.userId,
    gameId: this.gameId,
    fromColumn: this.fromColumn,
    fromRow: this.fromRow,
    fromPiece: this.fromPiece,
    fromColor: this.fromColor,
    toColumn: this.toColumn,
    toRow: this.toRow,
    toPiece: this.toPiece,
    toColor: this.toColor,
    check: this.check,
    enPassant: this.enPassant,
    castling: this.castling,
    enPassant: this.enPassant,
    promotion: this.promotionG
  }
};


module.exports = Move;