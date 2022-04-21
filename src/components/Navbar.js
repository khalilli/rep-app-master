import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="topnav">
          <a href={window.baseUrl + '/homepage' + '?func=ll&objId=' + window.currentWebreportId + '&objAction=RunReport'}>Homepage</a>
          {/* <a href={window.baseUrl + '/displaytasks' + '?func=ll&objId=' + window.currentWebreportId + '&objAction=RunReport'}>All Tasks</a> */}
        </div> 
    );
};
export default Navbar;