import { motion } from "framer-motion";
import styles from "./roundel.module.scss";

const Roundel = () => {
  return (
    <div className={styles.container}>
      <motion.svg
        viewBox="0 0 148 148"
        animate={{ opacity: [0, 1] }}
        opacity={0}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.85 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(24 24)" fill="none" fillRule="evenodd">
          <circle
            stroke="#E5E0DF"
            strokeWidth="1.934"
            cx="50"
            cy="50"
            r="41.779"
          />
          <motion.circle
            stroke="#7FDEEA"
            strokeWidth="1.934"
            cx="50"
            cy="50"
            r="41.779"
            style={{
              strokeDasharray: 283,
            }}
            animate={{
              rotate: [120, 40, -140, 180, 60, 190, -40, -100, 120],
              strokeDashoffset: [200, 180, 100, 220, 80, 120, 160, 180, 200],
            }}
            transition={{
              repeat: Infinity,
              duration: 40,
              times: [0, 0.125, 0.25, 0.3755, 0.5, 0.625, 0.75, 0.875, 1],
              ease: "anticipate",
            }}
          />
          <motion.circle
            stroke="#70DB8C"
            strokeWidth="18.859"
            cx="50"
            cy="50"
            r="50.242"
            style={{
              strokeDasharray: 316,
              strokeWidth: 18.859,
            }}
            animate={{
              rotate: [120, -55, 190, 0, 160, -100, 84, 220, 120],
              strokeDashoffset: [260, 220, 240, 210, 240, 220, 260, 230, 260],
            }}
            transition={{
              repeat: Infinity,
              duration: 40,
              times: [0, 0.125, 0.25, 0.3755, 0.5, 0.625, 0.75, 0.875, 1],
              ease: "anticipate",
            }}
          />
        </g>
      </motion.svg>
    </div>
  );
};

export default Roundel;
