import React from 'react';
import "./Navbar"

const Navbar = () => {
return (
    <ul className="nav justify-content-center">
        <li className="nav-item">
            <a className="nav-link" href="#">Homepage</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="#">Another Page</a>
        </li>
    </ul>
    );
};
export default Navbar;