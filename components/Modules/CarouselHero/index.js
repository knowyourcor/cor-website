import { useState, useEffect } from "react";
import Image from "next/image";
import { RichText } from "prismic-reactjs";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../../Section";
import Picture from "../../Picture";
import PlayPauseToggle from "../../PlayPauseToggle";
import styles from "./carouselHero.module.scss";

const Slide = ({ currentSlide, variant, image, headline, video_source }) => {
  const [playVideo, setPlayVideo] = useState(true);

  const slideVariant = {
    visible: {
      opacity: 1,
      transition: { duration: 0.75, ease: "easeOut" },
    },
    hidden: { opacity: 0 },
    exit: {
      opacity: 0,
      transition: { duration: 0.75, ease: "easeOut" },
    },
  };

  const imageItem = {
    visible: {
      scale: 1.035,
      transition: { duration: 1.5, ease: "easeOut" },
    },
    hidden: { scale: 1 },
    exit: {
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const videoItem = {
    visible: {
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
    hidden: { opacity: 0 },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const headlineItem = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
    hidden: { opacity: 0, scale: 0.985 },
    exit: {
      opacity: 1,
      scale: 0.985,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const handlePause = () => {
    const iframe = document.getElementById("videoHero");

    if (playVideo) {
      setPlayVideo(false);
      iframe.pause();
    } else {
      setPlayVideo(true);
      iframe.play();
    }
  };

  const HeadlineWithVideo = () => {
    return (
      <>
        <div className={styles.slidePanel}>
          <div className={styles.videoBackground}>
            <video id="videoHero" autoPlay muted loop playsInline>
              <source src={video_source} type="video/mp4" />
            </video>
            <div className={styles.toggle}>
              <PlayPauseToggle isPlaying={playVideo} toggle={handlePause} />
            </div>
          </div>
        </div>
        <div className={styles.slidePanel}>
          <div className={styles.headline}>
            <RichText render={headline} />
          </div>
        </div>
      </>
    );
  };

  const HeadlineWithVideoFullscreen = () => {
    return (
      <>
        <div className={styles.fullWidth}>
          <video
            className={styles.videoFullscreen}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={video_source} type="video/mp4" />
          </video>
          <div className={styles.toggle}>
            <PlayPauseToggle isPlaying={playVideo} toggle={handlePause} />
          </div>
          <div className={styles.content}>
            <RichText render={headline} />
          </div>
        </div>
      </>
    );
  };

  const HeadlineWithImage = () => {
    return (
      <>
        <div className={styles.slidePanel}>
          <div className={styles.image}>
            <Picture image={image} />
          </div>
        </div>
        <div className={styles.slidePanel}>
          <div className={styles.headline}>
            <RichText render={headline} />
          </div>
        </div>
      </>
    );
  };

  const ImageVideo = () => {
    return (
      <>
        <div className={styles.slidePanel}>
          <div className={styles.videoBackground}>
            <video id="videoHero" autoPlay muted loop playsInline>
              <source src={video_source} type="video/mp4" />
            </video>
            <div className={styles.toggle}>
              <PlayPauseToggle isPlaying={playVideo} toggle={handlePause} />
            </div>
          </div>
        </div>
        <div className={styles.slidePanel}>
          <div className={styles.image}>
            <Picture image={image} />
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 22.393 22.393"
          className={styles.corMark}
        >
          <path d="M19.36 8.544a8.584 8.584 0 11-8.164-5.931V.003a11.194 11.194 0 1010.649 7.736z" />
          <path d="M16.875 9.35l2.485-.807a8.586 8.586 0 00-8.164-5.935V5.22a5.973 5.973 0 015.679 4.126" />
        </svg>
      </>
    );
  };

  const FullscreenVideo = () => {
    return (
      <div className={styles.fullScreen}>
        <video
          className={styles.videoFullscreen}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={video_source} type="video/mp4" />
        </video>
        <div className={styles.toggle}>
          <PlayPauseToggle isPlaying={playVideo} toggle={handlePause} />
        </div>
      </div>
    );
  };

  const isHeadlineWithVideo =
    (video_source && headline && variant === "split-screen") ||
    (video_source && image && headline && variant === "split-screen");
  const isHeadlineWithVideoFullscreen =
    (video_source && headline && variant === "full-screen") ||
    (video_source && image && headline && variant === "full-screen");
  const isHeadlineWithImage = image && headline && !video_source;
  const isImageVideo = video_source && image && !headline;
  const isFullscreenVideo = video_source && !headline && !image;

  return (
    <>
      {currentSlide && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={slideVariant}
          className={styles.slide}
        >
          {isHeadlineWithVideo && <HeadlineWithVideo />}
          {isHeadlineWithVideoFullscreen && <HeadlineWithVideoFullscreen />}
          {isHeadlineWithImage && <HeadlineWithImage />}
          {isImageVideo && <ImageVideo />}
          {isFullscreenVideo && <FullscreenVideo />}
        </motion.div>
      )}
    </>
  );
};

const CarouselHero = ({ primary, fields }) => {
  const [count, setCount] = useState(0);

  const setActiveItem = (number) => {
    if (number > fields.length - 1) {
      // Loop from the end to the start
      setCount(0);
    } else if (number < 0) {
      // Loop from the start to the end
      setCount(fields.length - 1);
    } else {
      // Go to either the next or the previous
      setCount(number);
    }
  };

  useEffect(() => {
    const timer =
      fields.length > 1 &&
      setTimeout(() => {
        setActiveItem(count + 1);
      }, 8500);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <Section
      fullScreen
      backgroundColor={primary.background_color}
      align="center"
      noPadding
    >
      <div className={styles.carouselHero}>
        <AnimatePresence>
          {fields.map((field, index) => {
            return (
              <Slide
                {...field}
                key={`slide-${index}`}
                currentSlide={`slide-${index}` === `slide-${count}`}
              />
            );
          })}
        </AnimatePresence>
      </div>
      {/* <div className={styles.buttons}>
        <button onClick={() => setActiveItem(count - 1)}>Previous</button>
        <button onClick={() => setActiveItem(count + 1)}>Next</button>
      </div> */}
    </Section>
  );
};

export default CarouselHero;
