import { useState } from "react";
import { RichText } from "prismic-reactjs";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";

import styles from "./carousel.module.scss"

const TeamDetails = ({ name, position, description, fadeInVariants }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit="hidden"
      variants={fadeInVariants}
      className={styles.content}
    >
      <RichText render={name} />
      <RichText render={position} />
      <RichText render={description} />
    </motion.div>
  )
}

const Slide = ({ name, position, description, image }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const transition = {
    duration: 0.4,
    delay: 0.2,
    ease: "easeInOut"
  };

  const fadeInVariants = {
    hidden: {
      opacity: 0,
      transition
    },
    show: {
      opacity: 1,
      transition
    }
  };

  return (
    <>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        exit="hidden"
        variants={fadeInVariants}
        className={styles.portrait}
      >
        <img
          src={image.url}
        />
      </motion.div>

      <TeamDetails
        name={name}
        description={description}
        position={position}
        fadeInVariants={fadeInVariants}
      />
    </>
  );
};

const Carousel = ({ fields }) => {
  const [activeSlide, setActiveSlide] = useState("item-1");

  const swiperInit = {
    spaceBetween: 50,
    slidesPerView: 3.5,
    loop: true,
    resizeObserver: true,
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
    <div className={["swiper--slides__visibility", styles.customContainer].join(" ")}>
      <Swiper
        {...swiperInit}
        onSlideChange={(swiper) => {
          setActiveSlide(`item-${swiper.activeIndex}`)
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
    </div>
  );
};

export default Carousel;
