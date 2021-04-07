import { RichText } from "prismic-reactjs";
import { useKeenSlider } from "keen-slider/react"
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
  const [sliderRef] = useKeenSlider({
    slidesPerView: 2,
    spacing: 20,
    centered: true,
    initialSlide: 1,
    changed: function (slide) {
      console.log('Slide ' + slide + ' is ' + active)
    },
    breakpoints: {
      "(min-width: 768px)": {
        slidesPerView: 2,
        spacing: 50,
        centered: false,
      },
      "(min-width: 1024px)": {
        spacing: 60,
        slidesPerView: 3,
        centered: false,
      },
      "(min-width: 1280px)": {
        spacing: 30,
        slidesPerView: 4,
        centered: true,
      },
      "(min-width: 1440px)": {
        spacing: 55,
        slidesPerView: 4,
        centered: true,
      },
      "(min-width: 1680px)": {
        spacing: 100,
        slidesPerView: 4,
        centered: true,
      },
    },
  });
  const swiperInit = {
    spaceBetween: 50,
    slidesPerView: 3,
    effect: "fade",
    loop: true,
    grabCursor: true,
    resizeEvent: 'auto',
    breakpoints: {
      315: {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
      },
      576: {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 50,
        loop: true,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 50,
        loop: true,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 50,
        loop: true,
      },
    },
    // breakpoints: {
    //   320: {
    //     slidesPerView: "auto",
    //     spaceBetween: 20,
    //     loop: false,
    //   },
    //   576: {
    //     slidesPerView: 3,
    //     spaceBetween: 20,
    //     loop: true,
    //   },
    //   768: {
    //     slidesPerView: 3,
    //     spaceBetween: 20,
    //     loop: true,
    //   },
    //   992: {
    //     slidesPerView: 3,
    //     spaceBetween: 20,
    //     loop: true,
    //   },
    //   1200: {
    //     slidesPerView: 3,
    //     spaceBetween: 20,
    //     loop: true,
    //   },
    // }
  }

  return (
    <div className={["team-carousel", styles.customContainer].join(" ")}>
      {/* <div
        ref={sliderRef}
        className={["keen-slider"].join(" ")}
      >
        {fields.map((field, index) => {
          return (
            <div className="keen-slider__slide" key={`slide_${index}`}>
              <Slide {...field} />
            </div>
          );
        })}
      </div> */}
      <Swiper {...swiperInit}>
        {fields.map((field, index) => {
          return (
            <SwiperSlide key={index}>
              <Slide {...field} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div >
  );
};

export default Carousel;
