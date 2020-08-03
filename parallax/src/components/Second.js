import React from 'react';
import './style/second.scss';

export const Second = () => {
  return (
    <section className='second-section'>
      <div className='second-section-text-wrapper'>
        <p className='second-section-title'>SATURDAY - <br /><strong>LOREM</strong>IPSUM</p>
        <p className='second-section-desc'>
          Lorem ipsum dolor sit amet,<br />
          consectetur adipiscing elit,<br />
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className='second-section-image-wrapper'>
        <div className='second-section-image' />
      </div>
    </section>
  )
}
