import { RichText } from "prismic-reactjs";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";

import styles from "./index.module.scss";

export default function Index({ primary }) {
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
      className={styles.textBackgroundImage}
      style={{ backgroundColor: primary.background_color }}
    >
      <Container>
        <Row>
          <Column
            columns={{ xs: 14, md: 6 }}
            offsets={{ md: 1, lg: 1 }}
            className="custom__column"
          >
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              exit="hidden"
              variants={variants}
            >
              <RichText render={primary.heading} />
              <RichText render={primary.text} />
            </motion.div>
          </Column>
        </Row>
      </Container>
      <div
        className={styles.imageWrap}
        style={{ backgroundImage: `url(${primary.background_image.url})` }}
      ></div>
    </Section>
  );
}
