const React = require('react');
const { NavLink, Link } = require('react-router-dom');

class Header extends React.Component {
  render() {
    return (
	  <header className="pure-menu pure-menu-horizontal pure-menu-fixed">
	    <div >
    	  <Link 
    	  	to="/home" 
    	  	className="pure-menu-heading">React-Chess</Link>
	      <ul className="pure-menu-list">
	        <li className="pure-menu-item">
	        	<NavLink 
	        		to="/home" 
	        		className="pure-menu-link"
		    	  	activeClassName="active">Home</NavLink>
        	</li>
	        <li className="pure-menu-item">
	        	<NavLink 
	        		to="/login" 
	        		className="pure-menu-link"
		    	  	activeClassName="active">Login / Register</NavLink>
        	</li>
	        <li className="pure-menu-item">
	        	<NavLink 
	        		to="/game" 
	        		className="pure-menu-link"
		    	  	activeClassName="active">Game</NavLink>
        	</li>
	      </ul>
	    </div>
	  </header>
    );
  }
}

module.exports = Header;