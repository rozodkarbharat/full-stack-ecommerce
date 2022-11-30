import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const SmallCarousal = () => {
  return (
    <div>
      <Carousel autoPlay >
        <div>
          <img alt="" src="sale2.jpg" />
        </div>
        <div>
          <img alt="" src="sale2.jpg" />
        </div>
        <div>
          <img alt="" src="tv.jpg" />
        </div>
      </Carousel>
    </div>
  );
}

export default SmallCarousal
