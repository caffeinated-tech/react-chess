const React = require('react');
const ReactDOM = require('react-dom');
const classNames = require('classnames')
const { DropTarget } = require('react-dnd');

const Piece = require('./piece.jsx')
const Actions = require('./actions.js');

const squareTarget = {
  drop(props) {
    Actions.dropOnSquare(props.row, props.column);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div 
        onClick={this.onClick.bind(this)}
        className={classNames("square",this.props.color, {
          empty: this.props.piece == null,
          valid: this.props.validMove,
          selected: this.props.selected,
          lastMove: this.props.lastMove,
          isOver: isOver
        })}>
      {/*only render a piece if it's present, to prevent invalid drag events on empty squares*/}
        { (this.props.piece != null) &&
          <Piece {...this.props.piece}/>
        }
      </div>
    );
  }
  
  onClick() {
    Actions.clickSquare(this.props.row, this.props.column, this.props.piece);
  }
}

module.exports = DropTarget('PIECE', squareTarget, collect)(Square);