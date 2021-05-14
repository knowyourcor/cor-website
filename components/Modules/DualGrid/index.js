import { RichText } from "prismic-reactjs";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Container, Row, Column } from "../../Grid";
import Section from "../../Section";
import Picture from "../../Picture";
import styles from "./dualGrid.module.scss";

export default function DualGrid({ primary }) {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const transition = {
    duration: 0.4,
    delay: 0.2,
    ease: "easeInOut",
  };

  const variants = {
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
    <Section className={styles.dualGrid}>
      <Container ref={ref}>
        <Row align={{ md: "center" }}>
          <Column columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={variants}
              className={styles.image}
            >
              <Picture image={primary.image} />
            </motion.div>
          </Column>
          <Column columns={{ xs: 14, sm: 5 }} offsets={{ sm: 1 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={variants}
            >
              <RichText render={primary.headline} />
              <RichText render={primary.description} />
            </motion.div>
          </Column>
        </Row>
      </Container>
    </Section>
  );
}
