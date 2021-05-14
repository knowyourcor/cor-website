import { RichText } from "prismic-reactjs";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";
import Section from "../../Section";

import styles from "./shopDataProgress.module.scss";

export default function Index({ primary }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const transition = {
    duration: 0.4,
    delay: 0.2,
    ease: "easeInOut",
  };

  const fadeInVariants = {
    hidden: {
      opacity: 0,
      transition,
    },
    show: {
      opacity: 1,
      transition,
    },
  };

  return (
    <Section
      style={{
        background: `linear-gradient(
        180deg,
        transparent 37%,
        ${primary.background_color} 37%
      )`,
      }}
      className={styles.dataProgress}
    >
      <Container ref={ref}>
        <Row>
          <Column columns={{ xs: 14, md: 7 }} offsets={{ md: 1 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeInVariants}
              className={styles.image}
            >
              <Picture image={primary.image} />
            </motion.div>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeInVariants}
              className={styles.content}
            >
              <RichText render={primary.text} />
            </motion.div>
          </Column>
          <Column columns={{ xs: 14, md: 4 }} offsets={{ md: 1 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeInVariants}
              className={styles.headline}
            >
              <p className={styles.tag}>{primary.tag}</p>
              <RichText render={primary.headline} />
            </motion.div>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeInVariants}
              className={styles.screenshot}
            >
              <Picture image={primary.screenshot} />
            </motion.div>
          </Column>
        </Row>
      </Container>
    </Section>
  );
}
