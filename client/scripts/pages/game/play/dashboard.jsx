const React = require('react');
const ReactDOM = require('react-dom');
const classNames = require('classnames')

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="centered">
        <h3>
          Current turn: 
        </h3>
        <p>
          { this.props.turn }
          { this.props[this.props.turn] == this.props.me
            ? "(you)" : "(the enemy)"
          }
        </p>
        <button 
          type="button" 
          onClick={function(){socket.forfeitGame();}}
          className="pure-button pure-button-primary">
          Forfeit
        </button>
      </div>
    );
  }
}

module.exports = Dashboard;