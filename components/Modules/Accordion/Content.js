import { RichText } from "prismic-reactjs";
import { motion } from "framer-motion";

import styles from "./accordion.module.scss";

export default function Content({ text }) {
  const containerTransition = {
    duration: 0.75,
    ease: [0.465, 0.183, 0.153, 0.946],
  };

  const contentTransition = {
    y: {
      duration: 0.75,
      ease: [0.465, 0.183, 0.153, 0.946],
    },
    opacity: {
      delay: 0.25,
      duration: 0.75,
      ease: [0.465, 0.183, 0.153, 0.946],
    },
  };

  const container = {
    visible: {
      opacity: 1,
      height: "auto",
      transition: containerTransition,
    },
    hidden: {
      opacity: 0,
      height: 0,
      transition: containerTransition,
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: containerTransition,
    },
  };

  const item = {
    visible: {
      opacity: 1,
      y: 0,
      transition: contentTransition,
    },
    hidden: {
      opacity: 0,
      y: "75%",
      transition: contentTransition,
    },
    exit: {
      opacity: 0,
      y: "75%",
      transition: contentTransition,
    },
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={container}
      >
        <motion.div variants={item}>
          <div className={styles.content}>
            <RichText render={text} />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
