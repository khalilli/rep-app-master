import React from 'react';
import './Navbar.css';
import { useState } from 'react';

const Navbar = () => {
    return (
        <div className="topnav">
          <a href={window.baseUrl + '/homepage' + '?func=ll&objId=' + window.currentWebreportId + '&objAction=RunReport'}>Homepage</a>
          {window.userId === window.groupLeaderId ? <a href={window.baseUrl + '/displaytasks' + '?func=ll&objId=' + window.currentWebreportId + '&objAction=RunReport'}>All Tasks</a> : null }
        </div> 
    );
};
export default Navbar;