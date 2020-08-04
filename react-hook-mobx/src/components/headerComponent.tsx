import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faClock, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import Hamburger from '../share/hamburger';
import OutSideClick from '../share/outsideClick';
import '../style/header.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const HeaderComponent: React.FC<any> = (props) => {

  const screenWidth = props.screenWidth;
  const { time, email } = props;

  if (screenWidth < 1024) {
    return (
      <div className='main-container'>
        <section className='top-header'>
          <div className='header-container'>
          <div className="phone">
            <span><FontAwesomeIcon icon={faPhone} /></span>
          </div>        
          <div className="email">
            <span><FontAwesomeIcon icon={faClock} /></span>
          </div>
          <div className="clock">
            <span><FontAwesomeIcon icon={faMailBulk} /></span>
          </div>
          </div>
        </section>
        <section className ='main-menu'>
          <div className='main-wrapper'>
            <h1 className ='logo'>Ekko Care</h1>
            <OutSideClick>
              <Hamburger screenWidth={screenWidth} />
            </OutSideClick>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className='main-container'>
      <section className='top-header'>
        <div className='header-container'>
          <div className="phone">
            <span><FontAwesomeIcon icon={faPhone} /></span>
            <span>032-434-9999</span>  
          </div>        
          <div className="email">
            <span><FontAwesomeIcon icon={faClock} /></span>
            <span>{email}</span>
          </div>
          <div className="clock">
            <span><FontAwesomeIcon icon={faMailBulk} /></span>
            <span>{time}</span>
          </div>
        </div>
      </section>
      <section className ='main-menu'>
        <div className='main-wrapper'>
          <h1 className ='logo'>Ekko Care</h1>
          <ul className="menus">
            <li>Home</li>
            <li>About</li>
            <li>Gallery</li>
            <li>Blog</li>
            <li>Pages</li>
            <li>Demos</li>
            <li>Elements</li>
            <li>Blocks</li>
          </ul>
          <p className='contact-us'>CONTACT US</p>
        </div>
      </section>
    </div>
  )
}
