import * as React from 'react';
import { inject, observer } from 'mobx-react';
import '../style/hamburger.scss';

interface IHamburger {
  screenWidth: number;
  ShareStore: any;
}

const Hamburger = (props: any) => {

  const { screenWidth } = props;
  const menuStatus = props.ShareStore.menuStatus;

  const isMenuOpen = () => { 
    props.ShareStore.setMenuStatus()
  }

  return (
      <div id="menuToggle">
        <input className="menu-btn" type="checkbox" id="menu-btn" checked={menuStatus} />
        <label className="menu-icon" htmlFor="menu-btn" onClick={() => isMenuOpen()}>
          <span className="nav-icon"></span>
        </label>
        <ul className='menu' style={{width: `${screenWidth}px`}}>
          <li>Home</li>
          <li>About</li>
          <li>Gallery</li>
          <li>Blog</li>
          <li>Pages</li>
          <li>Demos</li>
          <li>Elements</li>
          <li>Blocks</li>
        </ul>
      </div>
  )
}

export default inject('ShareStore')(observer(Hamburger))
