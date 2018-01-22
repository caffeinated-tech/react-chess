const React = require('react');
const Reflux = require('reflux');
const { NavLink, Link } = require('react-router-dom');

const AuthStore = require('./pages/auth/store.js')


class Header extends Reflux.Component {
  constructor(props){
    super(props);
    this.store = AuthStore;
  }
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
          { this.state.user == undefined ?
  	        <li className="pure-menu-item">
  	        	<NavLink 
  	        		to="/auth/login" 
  	        		className="pure-menu-link"
                isActive={(match, location) => {return location.pathname.match(/^\/auth/)}}
  		    	  	activeClassName="active">Login / Register</NavLink>
          	</li>
            :
            <li className="pure-menu-item">
              <NavLink 
                to="/auth/profile" 
                className="pure-menu-link"
                activeClassName="active"
                title={"Welcome back " + this.state.user.username}>Profile</NavLink>
            </li>
          }
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