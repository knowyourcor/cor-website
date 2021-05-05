import { motion } from "framer-motion";
import styles from "./toggle.module.scss";

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

export const Toggle = ({ toggle, isOpen }) => {
  return (
    <>
      <button
        onClick={toggle}
        className={styles.toggle}
        aria-label={!isOpen ? "Open main menu" : "Close main menu"}
        title={!isOpen ? "Open main menu" : "Close main menu"}
        tabIndex="0"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 20 18"
          className={styles.icon}
        >
          <Path
            variants={{
              closed: { d: "M 2 7 L 18 7" },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
          />
          <Path
            variants={{
              closed: { d: "M 2 13 L 18 13" },
              open: { d: "M 3 2.5 L 17 16" },
            }}
          />
        </svg>
      </button>
    </>
  );
};

export default Toggle;
