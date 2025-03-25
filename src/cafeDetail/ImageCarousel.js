import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageCarousel.css"

const ImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i) => (
      <div className="custom-dot"></div>
    ),
    appendDots: (dots) => (
      <div style={{ bottom: "0px" }}>
        <ul className="image-carousel-dots"> {dots} </ul>
      </div>
    ),
  };

  if (!images || images.length === 0) {
    return (
      <img src="/img/default-cafe.jpg" alt="No Images" className="carousel-image" />
    );
  }

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Slide ${index}`} className="carousel-image" />
        </div>
      ))}
    </Slider>
  );
};

export default ImageCarousel;
