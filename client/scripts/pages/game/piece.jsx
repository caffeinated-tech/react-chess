const React = require('react');
const ReactDOM = require('react-dom');
const { DragSource } = require('react-dnd');
const classNames = require('classnames');
const Actions = require('./actions.js');


const pieceSource = {
  beginDrag(props) {
    Actions.dragPiece(props.row, props.column)
    return props;
  }
};
const pieceConnector = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});


class Piece extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { isDragging, connectDragSource } = this.props;
    let klass = classNames("piece", this.props.type, this.props.color, {
      selected: this.props.selected,
      dragging: isDragging
    });

    return connectDragSource(
      <div className={klass}>
      </div>
    );
  }

}

module.exports = DragSource('PIECE', pieceSource, pieceConnector)(Piece);