import Roundel from "../Roundel";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./roundelContainer.module.scss";

export default function Container({ index }) {
  const variants = {
    enter: {
      zIndex: 0,
      scale: 0,
      opacity: 0,
    },
    active: {
      zIndex: 5,
      scale: 1,
      opacity: 1,
    },
    exit: {
      zIndex: 10,
      scale: 10,
      opacity: 0,
    },
  };
  return (
    <div className={styles.container}>
      <AnimatePresence initial={false}>
        <motion.div
          transition={{
            scale: { ease: "easeOut", duration: 1.5 },
          }}
          variants={variants}
          initial="enter"
          animate="active"
          exit="exit"
          key={index}
          className={styles.roundel}
        >
          <Roundel index={index} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
