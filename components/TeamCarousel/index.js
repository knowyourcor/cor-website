import { useState } from "react";
import { RichText } from "prismic-reactjs";
import { Swiper, SwiperSlide } from "swiper/react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import TeamModal from "../TeamModal";

import styles from "./carousel.module.scss";

const TeamDetails = ({ name, position, description, fadeInVariants }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
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
    </motion.div>
  );
};

const Slide = ({ name, position, description, image }) => {
  const [modalOpen, setModalOpen] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const transition = {
    duration: 0.4,
    delay: 0.2,
    ease: "easeInOut",
  };

  const fadeInVariants = {
    hidden: {
      opacity: 0,
      transition,
    },
    show: {
      opacity: 1,
      transition,
    },
  };

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        exit="hidden"
        variants={fadeInVariants}
        className={styles.portrait}
        onClick={openModal}
      >
        <img src={image.url} />
      </motion.div>
      <TeamDetails
        name={name}
        description={description}
        position={position}
        fadeInVariants={fadeInVariants}
      />
      <TeamModal
        modalIsOpen={modalOpen}
        close={closeModal}
        image={image}
        name={name}
        position={position}
        description={description}
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
    },
  };

  return (
    <div
      className={["swiper--slides__visibility", styles.customContainer].join(
        " "
      )}
    >
      <Swiper
        {...swiperInit}
        onSlideChange={(swiper) => {
          setActiveSlide(`item-${swiper.activeIndex}`);
        }}
      >
        {fields.map((field, index) => {
          return (
            <SwiperSlide
              key={index}
              className={[
                styles.swiperSlide,
                `item-${index}` === activeSlide && styles.swiperSlideActive,
              ].join(" ")}
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
