import { RichText } from "prismic-reactjs";
import { motion } from "framer-motion";
import styles from "./roundelmeter.module.scss";

const Roundel = ({ score }) => {
  return (
    <div className={styles.container}>
      <motion.svg viewBox="0 0 148 148" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(24 24)" fill="none" fillRule="evenodd">
          {/* Gray */}
          <circle stroke="#E5E0DF" strokeWidth="2" cx="50" cy="50" r="41.75" />
          {/* <motion.circle
            stroke="#E5E0DF"
            strokeWidth="2"
            cx="50"
            cy="50"
            r="41.75"
            style={{
              strokeDasharray: 283
            }}
            animate={{
              rotate: [48, 138],
              strokeDashoffset: [180, 180]
            }}
            transition={{
              duration: 3,
              times: [0, 1],
              ease: "anticipate"
            }}
          /> */}

          {/* Red */}
          <motion.circle
            stroke="#FF7050"
            strokeWidth="19"
            cx="50"
            cy="50"
            r="50.242"
            style={{
              strokeDasharray: 360,
              strokeWidth: 19,
            }}
            animate={{
              rotate: [180, 250],
              strokeDashoffset: [270, 270],
            }}
            transition={{
              duration: 3,
              times: [0, 1],
              ease: "anticipate",
            }}
          />

          {/* Green */}
          <motion.circle
            stroke="#70DB8C"
            strokeWidth="19"
            cx="50"
            cy="50"
            r="50.242"
            style={{
              strokeDasharray: 360,
              strokeWidth: 19,
            }}
            animate={{
              rotate: [180, 35],
              strokeDashoffset: [270, 270],
            }}
            transition={{
              duration: 3,
              times: [0, 1],
              ease: "anticipate",
            }}
          />

          {/* Dark teal */}
          <motion.circle
            stroke="#034069"
            strokeWidth="29"
            cx="50"
            cy="50"
            r="55"
            style={{
              strokeDasharray: 360,
              strokeWidth: 29,
            }}
            animate={{
              rotate: [45, -40],
              strokeDashoffset: [270, 270],
            }}
            transition={{
              duration: 3,
              times: [0, 1],
              ease: "anticipate",
            }}
          />

          {/* Teal */}
          <motion.circle
            stroke="#80DEEB"
            strokeWidth="29"
            cx="50"
            cy="50"
            r="55"
            style={{
              strokeDasharray: 360,
              strokeWidth: 29,
            }}
            animate={{
              rotate: [90, 180],
              strokeDashoffset: [270, 270],
            }}
            transition={{
              duration: 3,
              times: [0, 1],
              ease: "anticipate",
            }}
          />
        </g>
      </motion.svg>
      <div className={styles.meterScore}>
        <RichText render={score} />
      </div>
    </div>
  );
};

export default Roundel;
