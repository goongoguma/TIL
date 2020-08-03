import React, { useState } from 'react';
import './style/hamburger.scss';

export const Hamburger = () => {
  const [click, setClick] = useState(false);

  const labelClick = () => {
    setClick(!click)
  };

  return (
    <div className="main">
    <header className="header">
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn" onClick={labelClick}>
        <span className="nav-icon"></span>
      </label>
      <ul className="menu">
        <li><a href="#dont">HOME</a></li>
        <li><a href="#forget">ROOMS</a></li>
        <li><a href="#subscribe">FACILITY</a></li>
        <li><a href="#comment">LOCATION</a></li>
      </ul>
    </header>
  </div>
  )
}
