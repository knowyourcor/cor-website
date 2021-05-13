import React, { useEffect } from "react";
import { RichText } from "prismic-reactjs";
import { motion, useAnimation } from "framer-motion";
import styles from "./roundel.module.scss";

export default function Roundel({ index = 0, score }) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const transition = { duration: 4, ease: "anticipate" };

  const scaleUp = useAnimation();
  const red = useAnimation();
  const green = useAnimation();
  const blue = useAnimation();
  const teal = useAnimation();

  // Set positions on intital load
  useEffect(() => {
    scaleUp.set({
      scale: 0.35,
      opacity: 0,
    });

    red.set({
      rotate: getRandomInt(0, 360),
      strokeDashoffset: getRandomInt(220, 300),
    });

    green.set({
      rotate: getRandomInt(0, 360),
      strokeDashoffset: getRandomInt(220, 300),
    });

    blue.set({
      rotate: getRandomInt(0, 360),
      strokeDashoffset: getRandomInt(220, 300),
    });

    teal.set({
      rotate: getRandomInt(0, 360),
      strokeDashoffset: getRandomInt(220, 300),
    });
  }, []);

  // Update position on data change
  useEffect(() => {
    scaleUp.start({
      scale: 1,
      opacity: 1,
      transition: { delay: 2, duration: 0.5, ease: "easeOut" },
    });

    red.start({
      rotate: getRandomInt(0, 360),
      strokeDashoffset: getRandomInt(220, 300),
      transition: transition,
    });

    green.start({
      rotate: getRandomInt(0, 360),
      strokeDashoffset: getRandomInt(220, 300),
      transition: transition,
    });

    blue.start({
      rotate: getRandomInt(0, 360),
      strokeDashoffset: getRandomInt(220, 300),
      transition: transition,
    });

    teal.start({
      rotate: getRandomInt(0, 360),
      strokeDashoffset: getRandomInt(220, 300),
      transition: transition,
    });
  }, [index]);
  return (
    <>
      <svg viewBox="0 0 148 148" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(24 24)" fill="none" fillRule="evenodd">
          {/* Gray */}
          <circle stroke="#E5E0DF" strokeWidth="2" cx="50" cy="50" r="41.75" />

          {/* Blue */}
          <motion.circle
            stroke="#034069"
            strokeWidth="29"
            cx="50"
            cy="50"
            r="55.242"
            animate={blue}
            style={{
              strokeDasharray: 360,
            }}
          />

          {/* Teal */}
          <motion.circle
            stroke="#80DEEB"
            strokeWidth="29"
            cx="50"
            cy="50"
            r="55.242"
            animate={teal}
            style={{
              strokeDasharray: 360,
            }}
          />

          {/* Green */}
          <motion.circle
            stroke="#70DB8C"
            strokeWidth="19"
            cx="50"
            cy="50"
            r="50.242"
            animate={green}
            style={{
              strokeDasharray: 360,
            }}
          />

          {/* Red */}
          <motion.circle
            stroke="#FF7050"
            strokeWidth="19"
            cx="50"
            cy="50"
            r="50.242"
            animate={red}
            style={{
              strokeDasharray: 360,
            }}
          />
        </g>
      </svg>
      {score && (
        <motion.div animate={scaleUp} className={styles.score}>
          <RichText render={score} />
        </motion.div>
      )}
    </>
  );
}
