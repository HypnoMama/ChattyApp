import React, {Component} from 'react';

class Nav extends Component {

    render() {


        return (
        
       
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chat It Up!<i className="far fa-comments"></i></a>
                <span className="count">{this.props.count} users online</span>
            </nav>
       
        )
    }
}

export default Nav;