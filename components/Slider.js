import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Slider = () => {
  return (
    <Carousel>
      <div>
        <img src="/banner1.jpg" />
      </div>
      <div>
        <img src="/banner2.jpg" />
      </div>
      <div>
        <img src="/banner3.jpg" />
      </div>
    </Carousel>
  );
};

export default Slider;
