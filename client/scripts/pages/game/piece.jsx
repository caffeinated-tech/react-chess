const React = require('react');
const ReactDOM = require('react-dom');
const classNames = require('classnames');

class Piece extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let klass = classNames("piece", this.props.type, this.props.color, 
      {selected: this.props.selected});

    return (
      <div className={klass}>
      </div>
    );
  }

}

module.exports = Piece;