import React, { useEffect } from "react";
import { RichText } from "prismic-reactjs";
import { motion, useAnimation } from "framer-motion";
import styles from "./roundel.module.scss";

const defaultColors = ["#80deeb", "#034561", "#ff704f", "#70DB8C"];

export default function Roundel({ index = 0, colors = defaultColors, score }) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const transition = { duration: 4, ease: "anticipate" };

  const scaleUp = useAnimation();
  const circleThree = useAnimation();
  const circleFour = useAnimation();
  const circleTwo = useAnimation();
  const circleOne = useAnimation();

  // Set positions on initital load
  useEffect(() => {
    scaleUp.set({
      scale: 0.35,
      opacity: 0,
    });

    circleThree.set({
      rotate: getRandomInt(0, 360),
      strokeDashoffset: getRandomInt(220, 300),
    });

    circleFour.set({
      rotate: getRandomInt(0, 360),
      strokeDashoffset: getRandomInt(220, 300),
    });

    circleTwo.set({
      rotate: getRandomInt(0, 360),
      strokeDashoffset: getRandomInt(220, 300),
    });

    circleOne.set({
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

    circleThree.start({
      rotate: getRandomInt(0, 360),
      strokeDashoffset: getRandomInt(220, 300),
      transition: transition,
    });

    circleFour.start({
      rotate: getRandomInt(0, 360),
      strokeDashoffset: getRandomInt(220, 300),
      transition: transition,
    });

    circleTwo.start({
      rotate: getRandomInt(0, 360),
      strokeDashoffset: getRandomInt(220, 300),
      transition: transition,
    });

    circleOne.start({
      rotate: getRandomInt(0, 360),
      strokeDashoffset: getRandomInt(220, 300),
      transition: transition,
    });
  }, [index]);
  return (
    <>
      <svg
        viewBox="0 0 148 148"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.roundel}
      >
        <g transform="translate(24 24)" fill="none" fillRule="evenodd">
          <circle stroke="#e0e0e0" strokeWidth="2" cx="50" cy="50" r="41.75" />

          <motion.circle
            stroke={colors[0]}
            strokeWidth="14"
            cx="50"
            cy="50"
            r="47.85"
            animate={circleOne}
            style={{
              strokeDasharray: 360,
            }}
          />

          <motion.circle
            stroke={colors[1]}
            strokeWidth="14"
            cx="50"
            cy="50"
            r="47.85"
            animate={circleTwo}
            style={{
              strokeDasharray: 360,
            }}
          />

          <motion.circle
            stroke={colors[2]}
            strokeWidth="14"
            cx="50"
            cy="50"
            r="47.85"
            animate={circleThree}
            style={{
              strokeDasharray: 360,
            }}
          />

          <motion.circle
            stroke={colors[3]}
            strokeWidth="28"
            cx="50"
            cy="50"
            r="54.8"
            animate={circleFour}
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
