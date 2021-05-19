import { RichText } from "prismic-reactjs";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";
import styles from "./textImage.module.scss";

export default function TextImage({ primary }) {
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
    <Section className={styles.textImage}>
      <Container ref={ref}>
        <Row>
          <Column columns={{ xs: 14, md: 6, lg: 6 }} offsets={{ md: 1 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeInVariants}
            >
              <RichText render={primary.label} />
              <RichText render={primary.headline} />
            </motion.div>
          </Column>
        </Row>

        <Row>
          <Column columns={{ xs: 14, md: 10 }} offsets={{ md: 1 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeInVariants}
              className={styles.image}
            >
              <Picture image={primary.image} />
            </motion.div>
          </Column>
        </Row>
        <Row>
          <Column columns={{ xs: 14, md: 8, lg: 5 }} offsets={{ md: 1 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeInVariants}
            >
              <RichText render={primary.description} />
            </motion.div>
          </Column>
        </Row>
      </Container>
    </Section>
  );
}
