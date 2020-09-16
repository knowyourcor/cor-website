import React, { useState, useRef, useEffect } from "react";
import styles from "./picture.module.scss";

const Picture = ({ image, classes }) => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();

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
    image && (
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
    )
  );
};

export default Picture;
