const React = require('react');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');
const classNames = require('classnames')
const { DragDropContext } = require('react-dnd');
const HTML5Backend = require('react-dnd-html5-backend');


const Square = require('./square.jsx')
const Actions = require('./actions.js');

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="board">
        {this.props.board.map(function(row, rowIndex){
          return <div className="row" key={rowIndex}>
            {row.map(function(square, columnIndex){
              return (
                <Square {...square} 
                  row={rowIndex} 
                  column={columnIndex} 
                  key={columnIndex}/>
              );
            }, this)}
          </div>
        }, this)}
      </div>
    );
  }
}

// make the board a container for drag & drop actions
module.exports = DragDropContext(HTML5Backend)(Board);