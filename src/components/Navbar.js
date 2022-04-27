import React from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="topnav">
          <Link to={window.baseUrl + '/homepage' + '?func=ll&objId=' + window.currentWebreportId + '&objAction=RunReport'}>Homepage</Link>
          {/* <a href={window.baseUrl + '/displaytasks' + '?func=ll&objId=' + window.currentWebreportId + '&objAction=RunReport'}>All Tasks</a> */}
          {window.userId === window.groupLeaderId ? <Link to={window.baseUrl + '/displaytasks' + '?func=ll&objId=' + window.currentWebreportId + '&objAction=RunReport'}>All Tasks</Link> : null }
        </div> 
    );
};
export default Navbar;