const React = require('react');
const ReactDOM = require('react-dom');
const classNames = require('classnames');

class Pawn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={classNames("piece","pawn", this.props.color, {selected: this.props.selected})}>
      </div>
    );
  }

}

module.exports = Pawn;