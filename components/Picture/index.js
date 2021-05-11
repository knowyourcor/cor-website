import React, { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

import styles from "./picture.module.scss";

const Picture = ({ image, classes }) => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "10px 0px",
    triggerOnce: true,
  });

  const transition = {
    duration: 0.4,
    delay: 0.2,
    ease: "easeInOut",
  };

  const variants = {
    hidden: {
      opacity: 0,
      transition,
    },
    show: {
      opacity: 1,
      transition,
    },
  };

  // Device Pixel Ratios
  const drp = ["1", "2", "3"];

  // Breakpoints
  const breakpointXs = drp.map(
    (density) => `${image?.xs?.url}&dpr=${density} ${density}x`
  );
  const breakpointSm = drp.map(
    (density) => `${image?.sm?.url}&dpr=${density} ${density}x`
  );
  const breakpointMd = drp.map(
    (density) => `${image?.md?.url}&dpr=${density} ${density}x`
  );
  const breakpointLg = drp.map(
    (density) => `${image?.lg?.url}&dpr=${density} ${density}x`
  );
  const breakpointXl = drp.map(
    (density) => `${image?.xl?.url}&dpr=${density} ${density}x`
  );
  const breakpointXxl = drp.map(
    (density) => `${image?.xxl?.url}&dpr=${density} ${density}x`
  );

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
          <source
            media="(min-width: 1680px)"
            srcSet={breakpointXxl?.toString()}
          />
          <source
            media="(min-width: 1440px)"
            srcSet={breakpointXl?.toString()}
          />
          <source
            media="(min-width: 1280px)"
            srcSet={breakpointLg?.toString()}
          />
          <source
            media="(min-width: 1024px)"
            srcSet={breakpointMd?.toString()}
          />
          <source
            media="(min-width: 768px)"
            srcSet={breakpointSm?.toString()}
          />
          <source srcSet={breakpointXs} />
          <img
            ref={imageRef}
            onLoad={handleImageLoaded}
            src={breakpointXs[0]?.toString()}
            alt={image.alt}
            loading="lazy"
          />
        </picture>
      )}
    </motion.div>
  );
};

export default Picture;
