import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from "../auth/AuthOptions";

export class Navbar extends Component {


    render() {
        return (
            <nav className="NavbarItems">
                <div>
                    <Link to="/" className="navbar-logo">ChargemyCar</Link>
                </div>

                <AuthOptions />

            </nav>
        )
    }
}

export default Navbar;
