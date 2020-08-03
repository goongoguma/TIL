import React from 'react';
import './style/header.scss';

export const Header = ({ windowSize }) => {
  return (
    <div className='header-wrapper'>
      <p className='header-logo'>Logo</p>
      <ul className='header-menu'>
        <li>HOME</li>
        <li>ROOMS</li>
        <li>FACILITY</li>
        <li>LOCATION</li>
      </ul>
    </div>
  )
}
