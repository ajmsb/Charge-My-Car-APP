import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from "../auth/AuthOptions";

class Navbar extends Component {


    render() {
        return (
            <nav className="NavbarItems">
                <div>
                    <Link to="/" className="navbar-logo">ChargemyCar</Link>
                </div>
                <div>
                    <AuthOptions />
                </div>


            </nav>
        )
    }
}

export default Navbar;
