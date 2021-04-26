import { RichText } from "prismic-reactjs";
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";

import Section from "../../Section";
import { Container } from "../../Grid";
import Picture from "../../Picture";

import styles from "./index.module.scss"

export default function Index({ primary }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
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
    <Section className={styles.textDescriptionImage} align="center">
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          exit="hidden"
          variants={variants}
        >
          <RichText render={primary.heading} />
          <RichText render={primary.sub_heading} />
        </motion.div>
      </Container>
      <motion.div
        className={styles.image}
      >
        <Picture image={primary.image} />
      </motion.div>
      <Container>
        <motion.div>
          <RichText render={primary.description} />
        </motion.div>
      </Container>
    </Section>
  )
}