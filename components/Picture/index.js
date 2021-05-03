import React, { useState, useRef, useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";

import styles from "./picture.module.scss";

const Picture = ({ image, classes }) => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "10px 0px",
  });

  const transition = {
    duration: 0.4,
    delay: 0.2,
    ease: "easeInOut"
  };

  const variants = {
    hidden: {
      opacity: 0,
      transition
    },
    show: {
      opacity: 1,
      transition
    }
  };

  const breakpointXs = image.xs;
  const breakpointSm = image.sm;
  const breakpointMd = image.md;
  const breakpointLg = image.lg;
  const breakpointXl = image.xl;
  const breakpointXxl = image.xxl;

  function handleImageLoaded() {
    const image = imageRef.current;
    if (!image.complete) {
      setLoading(true);
    } else {
      setLoading(false);
      setLoaded(true);
    }
  }

  useEffect(() => {
    const image = imageRef.current;
    if (image.complete) {
      setLoaded(true);
    } else {
      setLoaded(false);
      setLoading(true);
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit="hidden"
      variants={variants}
    >
      {image && (
        <picture
          className={[
            styles.picture,
            classes,
            loaded && styles.loaded,
            loading && styles.loading,
          ].join(" ")}
        >
          <source media="(min-width: 1680px)" srcSet={breakpointXxl.url} />
          <source media="(min-width: 1440px)" srcSet={breakpointXl.url} />
          <source media="(min-width: 1280px)" srcSet={breakpointLg.url} />
          <source media="(min-width: 1024px)" srcSet={breakpointMd.url} />
          <source media="(min-width: 768px)" srcSet={breakpointSm.url} />
          <source srcSet={breakpointXs.url} />
          <img
            ref={imageRef}
            onLoad={handleImageLoaded}
            src={breakpointXs.url}
            alt={image.alt}
          />
        </picture>
      )}
    </motion.div>
  );
};

export default Picture;
