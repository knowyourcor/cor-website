import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { fadeIn } from "../../../lib/variants";

import Picture from "../../Picture";
import styles from "./image.module.scss";

const Image = ({ primary }) => {
  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeIn}
      className={styles.image}
    >
      <Picture image={primary.image} />
    </motion.div>
  );
};

export default Image;
