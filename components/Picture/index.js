import React, { useState, useRef, useEffect } from "react";

import styles from "./picture.module.scss";

const Picture = ({ image: prismicImageData, classes }) => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();

  // define breakpoint names used in Primsic
  const breakpoints = ["xxl", "xl", "lg", "md", "sm", "xs", "xxs"];

  // define breakpoint min-widths
  const minWidth = [1680, 1440, 1280, 1024, 768, 512, 0];

  // Define base image breakpoint data
  // Prismic flattens the base image without a key,
  // we'll use breakpoints[0] as our key
  const baseImageBreakpoint = {
    [breakpoints[breakpoints.length - 1]]: {
      dimensions: prismicImageData.dimensions,
      alt: prismicImageData.alt,
      copyright: prismicImageData.copyright,
      url: prismicImageData.url,
    },
  };

  // Get all breakpoints from {prismicImageData} based on our [breakpoints]
  const imageBreakpoints = Object.keys(prismicImageData)
    .filter((key) => breakpoints.includes(key))
    .reduce((obj, key) => {
      obj[key] = prismicImageData[key];
      return obj;
    }, {});

  // Merge imageBreakpoints and baseImageBreakpoint
  const imageData = { ...imageBreakpoints, ...baseImageBreakpoint };

  // Device Pixel Ratios
  const dpr = ["1", "2", "3"];

  // Create srcset based on [dpr]
  const handleSrcSet = (breakpoint) =>
    dpr
      .map(
        (density) =>
          `${imageData?.[breakpoint]?.url}&dpr=${density} ${density}x`
      )
      .toString();

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
    <>
      {prismicImageData && (
        <picture
          className={[
            styles.picture,
            classes,
            loaded && styles.loaded,
            loading && styles.loading,
          ].join(" ")}
        >
          {breakpoints.map((breakpoint, index) => (
            <source
              key={index}
              media={`(min-width: ${minWidth[index]}px)`}
              srcSet={handleSrcSet(breakpoint)}
              width={imageData[breakpoint].dimensions.width}
              height={imageData[breakpoint].dimensions.height}
            />
          ))}
          <img
            ref={imageRef}
            onLoad={handleImageLoaded}
            src={imageData["xxs"].url}
            alt={imageData["xxs"].alt}
            loading="lazy"
          />
        </picture>
      )}
    </>
  );
};

export default Picture;
