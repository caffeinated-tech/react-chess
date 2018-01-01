const React = require('react');
const ReactDOM = require('react-dom');
const classNames = require('classnames')

const Pawn = require('./pawn.jsx')
const Actions = require('./actions.js');

class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.validMove);
    return (
      <div 
        onClick={this.onClick.bind(this)}
        className={classNames("square",this.props.color, {
          empty: this.props.piece == null,
          valid: this.props.validMove,
          selected: this.props.selected,
          lastMove: this.props.lastMove
        })}>
        { this.renderPiece() }
      </div>
    );
  }

  renderPiece(){
    if(this.props.piece == null){
      return null;
    }
    switch(this.props.piece.type){
      case 'pawn':
        return <Pawn {...this.props.piece}/>;
      default:
        return null;
    }
  }

  onClick() {
    Actions.clickSquare(this.props.row, this.props.column, this.props.piece);
  }
}

module.exports = Square;