import { RichText } from "prismic-reactjs";
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";

import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";

import styles from "./index.module.scss"

export default function Index({ primary }) {
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
    <Section className={styles.dualGrid}>
      <Container>
        <Row align="center" textAlign={{ xs: "left" }}>
          <Column className="custom__column" columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} justify="center">
            <Picture image={primary.image} />
          </Column>
          <Column columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} justify="center" >
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              exit="hidden"
              variants={variants}
            >
              <RichText render={primary.heading} />
              <RichText render={primary.description} />
            </motion.div>
          </Column>
        </Row>
      </Container>
    </Section>
  )
}