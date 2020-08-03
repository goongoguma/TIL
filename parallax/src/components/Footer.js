import React from 'react';
import './style/footer.scss';

export const Footer = () => {
  return (
    <section className='footer-section'>
      <div className='footer-section-wrapper'>
        <div className='footer-section-1'>
          Logo
        </div>
        <div className='footer-section-2'>
          <p className='footer-section-title'><strong>ADDRESS</strong></p>
          <p>Contrary to popular belief,<br /> Lorem Ipsum is not simply random text.</p>
        </div>
        <div className='footer-section-3'>
          <p className='footer-section-title'><strong>CONTACT</strong></p>
          <p>There are many variations of passages<br /> of Lorem Ipsum available</p>
        </div>
      </div>
      <p className='copy-right'>© Copyright 2020 JaeHyunAn all rights reserved.</p>
    </section>
  )
}
