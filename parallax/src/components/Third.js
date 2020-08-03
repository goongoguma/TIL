import React from 'react';
import Slider from "react-slick";
import img1 from "../img/c1.jpg";
import img2 from "../img/c2.jpg";
import img3 from "../img/c3.jpg";

export const Third = () => {
  const setting = {
    arrows: false,
    dots: true,
    draggable: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2000
  }
  return (
      <div style={{'margin': '0 auto'}}>
        <Slider {...setting}>
          <div>
            <img src={img1} style={{'width': '100%'}}/>
          </div>
          <div>
            <img src={img2} style={{'width': '100%'}}/>
          </div>
          <div>
            <img src={img3} style={{'width': '100%'}}/>
          </div>
        </Slider>
      </div>
  )
}
