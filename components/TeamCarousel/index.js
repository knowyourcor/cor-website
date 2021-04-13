import { useState } from "react";
import { RichText } from "prismic-reactjs";
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from "./carousel.module.scss"

const Slide = ({ name, position, description, image }) => {
  return (
    <>
      <div className={styles.portrait}>
        <img
          src={image.url}
        />
      </div>

      <div className={styles.content}>
        <RichText render={name} />
        <RichText render={position} />
        <RichText render={description} />
      </div>
    </>
  );
};

const Carousel = ({ fields }) => {
  const [activeSlide, setActiveSlide] = useState("item-1");

  const swiperInit = {
    spaceBetween: 50,
    slidesPerView: 3.5,
    loop: true,
    resizeevent: 'auto',
    breakpoints: {
      315: {
        slidesPerView: 2.5,
        spaceBetween: 20,
        loop: true,
      },
      576: {
        slidesPerView: 3.5,
        spaceBetween: 20,
        loop: true,
      },
      768: {
        slidesPerView: 3.5,
        spaceBetween: 50,
        loop: true,
      },
      992: {
        slidesPerView: 2.5,
        spaceBetween: 50,
        loop: true,
      },
      1200: {
        slidesPerView: 3.5,
        spaceBetween: 50,
        loop: true,
      },
    }
  }

  return (
    <div className={["team-carousel", styles.customContainer].join(" ")}>
      <Swiper
        {...swiperInit}
        onSlideChange={(swiper) => {
          setActiveSlide(`item-${swiper.activeIndex}`)
          console.log(swiper)
        }}
      >
        {fields.map((field, index) => {
          return (
            <SwiperSlide
              key={index}
              className={[
                styles.swiperSlide,
                `item-${index}` === activeSlide && styles.swiperSlideActive].join(" ")
              }
            >
              <Slide {...field} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div >
  );
};

export default Carousel;
