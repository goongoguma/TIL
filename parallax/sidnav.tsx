import React from 'react';
import { Link } from 'react-router-dom';
import './sidenav.scss'

const SideNav = () => {
  return (
    <div className="sidebar">
        <h2>The Cup</h2>
        <ul>
            <li><Link to="/user-cars">User Cars</Link></li>
            <li><Link to="/cars">Cars</Link></li>
            <li><Link to="/share">Share</Link></li>
            <li><Link to="/verification-codes">Verification Codes</Link></li>
        </ul> 
    </div>
  )
}

export default SideNav;
