import { RichText } from "prismic-reactjs";
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";
import { Container } from "../../Grid";

import styles from "./text.module.scss";

const BodyText = ({ primary }) => {
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
    <Container>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        exit="hidden"
        variants={variants}
        className={styles.text}
      >
        <RichText render={primary.text} />
      </motion.div>
    </Container>
  );
};

export default BodyText;
