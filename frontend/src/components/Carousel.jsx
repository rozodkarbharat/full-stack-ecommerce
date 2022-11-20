import React from "react";
import ImageSlider, { Slide } from "react-auto-image-slider";
import carousal from "../css/carousal.module.css"
const CarouselComp=()=>{
return (
  <div className={carousal.div}>
    <ImageSlider effectDelay={500} autoPlayDelay={2000}>
      <Slide>
        <img alt="img2" src="sale1.jpg" />
      </Slide>
      <Slide>
        <img alt="img2" src="sale2.jpg" />
      </Slide>
      <Slide>
        <img alt="img1" src="tv.jpg" />
      </Slide>
    </ImageSlider>
  </div>
);
}

export default CarouselComp