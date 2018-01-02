const React = require('react');
const ReactDOM = require('react-dom');
const classNames = require('classnames')

const Piece = require('./piece.jsx')
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
        <Piece {...this.props.piece}/>
      </div>
    );
  }
  
  onClick() {
    Actions.clickSquare(this.props.row, this.props.column, this.props.piece);
  }
}

module.exports = Square;