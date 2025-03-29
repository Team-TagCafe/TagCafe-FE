import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./ImageCarousel.css";

const ImageCarousel = ({ images }) => {
  if (!images || images.length === 0) {
    return (
      <img
        src="/img/default-cafe.jpg"
        alt="No Images"
        className="carousel-image"
      />
    );
  }

  return (
    <Swiper
      loop={true}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      className="image-carousel-swiper"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image}
            alt={`Slide ${index}`}
            className="carousel-image"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
