import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";

import Picture from "../../Picture";
import styles from "./image.module.scss";

const Image = ({ primary }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const transition = {
    duration: 0.4,
    delay: 0.2,
    ease: "easeInOut"
  };

  const variants = {
    hidden: {
      opacity: 0,
      transition
    },
    show: {
      opacity: 1,
      transition
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit="hidden"
      variants={variants}
      className={styles.image}
    >
      <Picture image={primary.image} />
    </motion.div>
  );
};

export default Image;
