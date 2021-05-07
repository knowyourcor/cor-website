import { useState, useEffect } from "react";
import Image from "next/image";
import { RichText } from "prismic-reactjs";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import Section from "../../Section";
import Picture from "../../Picture";
import Button from "../../Button";
import styles from "./carouselHero.module.scss";

const Slide = ({ isOpen, variant, image, headline, number, video_source }) => {
  const [playVideo, setPlayVideo] = useState(true)
  
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
    const iframe = document.getElementById('video');

    if (playVideo) {
      setPlayVideo(false)
    } else {
      setPlayVideo(true)
    }

    if (!playVideo) {
      iframe.pause();
    } else {
      iframe.play();
    }
  }

  return (
    <>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={slideVariant}
          className={styles.slide}
        >
          <div className={styles.slideLeft}>
            {variant === "Portrait Image(s) + Animated Totem(s)" &&
              <Picture image={image} />
            }
            {variant === "Images / Video + Headline" && video_source &&
              <motion.div
                className={styles.videoBackground}
                variants={videoItem}
              >
                <video id="video" autoPlay muted loop playsInline>
                  <source src={video_source} type="video/mp4" />
                </video>
                <button className={styles.btnPause} onClick={handlePause}>
                  <Image src="/icons/pause-icon.svg" height={35} width={35} />
                </button>
              </motion.div>
            }
          </div>
          <div className={styles.slideRight}>
            {variant === "Images / Video + Headline" && (
              <motion.div variants={headlineItem} className={styles.headline}>
                <RichText render={headline} />
              </motion.div>
            )}
            {variant === "Portrait Image(s) + Animated Totem(s)" && video_source && (
              <motion.div
                className={styles.videoBackground}
                variants={videoItem}
              >
                <video id="video" autoPlay muted loop playsInline>
                  <source src={video_source} type="video/mp4" />
                </video>
                <button className={styles.btnPause} onClick={handlePause}>
                  <Image src="/icons/pause-icon.svg" height={35} width={35} />
                </button>
              </motion.div>
            )}
          </div>
          {variant === "Full-Bleed Video" &&
            <div className={styles.fullWidth}>
              <div className={styles.backgroundImage}>
                {/* <Picture image={image} /> */}
                {video_source && (
                  <>
                    <video id="video" autoPlay muted loop playsInline>
                      <source src={video_source} type="video/mp4" />
                    </video>
                    <button className={styles.btnPause} onClick={handlePause}>
                      <Image src="/icons/pause-icon.svg" height={35} width={35} />
                    </button>
                  </>
                )}
              </div>
              <div className={styles.content}>
                {headline[0].text && <RichText render={headline} />}
              </div>
            </div>
          }
          {variant === "Portrait Image(s) + Animated Totem(s)" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 22.393 22.393"
              className={styles.svgWrap}
            >
              <path
                data-name="Path 40"
                d="M19.36 8.544a8.584 8.584 0 11-8.164-5.931V.003a11.194 11.194 0 1010.649 7.736z"
              />
              <path
                data-name="Path 41"
                d="M16.875 9.35l2.485-.807a8.586 8.586 0 00-8.164-5.935V5.22a5.973 5.973 0 015.679 4.126"
              />
            </svg>
          )}
        </motion.div>
      )}
    </>
  );
};

const CarouselHero = ({ primary, fields }) => {
  // Simple counter
  const [count, setCount] = useState(0);

  // Set Active Item
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
    const timer = setTimeout(() => {
      setActiveItem(count + 1);
    }, 80500);
    return () => clearTimeout(timer);
  }, [count]);

  if (fields[0].variant !== "Portrait Image(s) + Animated Totem(s)") {
    // let findData = fields.find(el => el.variant === "Portrait Image(s) + Animated Totem(s)")
    fields.unshift(
      fields.splice(
        fields.map(function (e) { return e.variant }).indexOf('Portrait Image(s) + Animated Totem(s)'),
        1)[0]
    )
  }

  return (
    <Section
      fullScreen
      backgroundColor={primary.background_color}
      align="center"
      noPadding
    >
      <AnimatePresence>
        {fields.map((field, index) => {
          return (
            <Slide
              {...field}
              key={`slide-${index}`}
              isOpen={`slide-${index}` === `slide-${count}`}
            />
          );
        })}
      </AnimatePresence>

      {/* <div className={styles.cta}>
        <Button linkData={primary.link} labelData={primary.link_label} />
      </div> */}

      {/* <div className={styles.buttons}>
        <button onClick={() => setActiveItem(count - 1)}>Previous</button>
        <button onClick={() => setActiveItem(count + 1)}>Next</button>
      </div> */}
    </Section>
  );
};

export default CarouselHero;
