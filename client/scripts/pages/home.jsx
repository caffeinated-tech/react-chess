const React = require('react');
const ReactDOM = require('react-dom');
const { Switch, Route, Link } = require('react-router-dom');

class HomePage extends React.Component {
   render() {
      return (
        <div className="pure-g">
          <div className="pure-u-1" id="hero">
            <div>
              <h1>React Chess</h1>
              <p>
                Open-Source online chess game built in ReactJS
              </p>
            </div>
          </div>
          <div className="pure-u-1 pure-u-md-1-3">
            TESTING
          </div>
          <div className="pure-u-1 pure-u-md-1-3">
            TESTING
          </div>
          <div className="pure-u-1 pure-u-md-1-3">
            TESTING
          </div>
        </div>
      );
   }
}

module.exports = HomePage;