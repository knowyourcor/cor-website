import { RichText } from "prismic-reactjs";
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";

import styles from "./shopTextImage.module.scss";

const TextImage = ({ primary }) => {
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
    <Section className={styles.section} style={{ backgroundColor: primary.background_color }} align="center">
      <Container>
        {primary.headline[0].text && (
          <Row align="center" textAlign={{ xs: "left" }}>
            <Column columns={{ xs: 14, md: 8 }} offsets={{ md: 2 }} className="custom__column">
              <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                exit="hidden"
                variants={variants}
              >
                <RichText render={primary.headline} />
              </motion.div>
            </Column>
            <Column columns={{ xs: 14, md: 4 }}>
              <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                exit="hidden"
                variants={variants}
              >
                <RichText render={primary.text} />
              </motion.div>
            </Column>
          </Row>
        )}
      </Container>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        exit="hidden"
        variants={variants}
        className={styles.imageWrap}
      >
        <Picture {...primary} classes={styles.image} />
      </motion.div>
    </Section>
  );
};

export default TextImage;
