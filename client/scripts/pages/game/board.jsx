const React = require('react');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');
const classNames = require('classnames')

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
          return <div className="row">
            {row.map(function(square, columnIndex){
              return (
                <Square {...square} row={rowIndex} column={columnIndex}/>
              );
            }, this)}
          </div>
        }, this)}
      </div>
    );
  }
}

module.exports = Board;