import { RichText } from "prismic-reactjs";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import TeamCarousel from "../../TeamCarousel";

import styles from "./index.module.scss";
import TeamFlip from "../../TeamFlip";

export default function Index({ primary, fields }) {
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
    <Section
      style={{ backgroundColor: primary.background_color }}
      className={styles.textCarousel}
    >
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          exit="hidden"
          variants={variants}
        >
          <Row
            justify="space-between"
            align="center"
            textAlign={{ xs: "left" }}
          >
            <Column
              columns={{ xs: 14, sm: 6 }}
              offsets={{ sm: 1 }}
              className="custom__column"
            >
              <RichText render={primary.heading} />
            </Column>
            <Column
              columns={{ xs: 14, sm: 6 }}
              offsets={{ sm: 1 }}
              justify="center"
            >
              <RichText render={primary.text} />
            </Column>
          </Row>
        </motion.div>
      </Container>
      <TeamFlip fields={fields} />
      <TeamCarousel fields={fields} />
    </Section>
  );
}
