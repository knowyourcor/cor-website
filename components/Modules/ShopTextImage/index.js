import { RichText } from "prismic-reactjs";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";
import { fadeIn } from "../../../lib/variants";
import styles from "./shopTextImage.module.scss";

const TextImage = ({ primary }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <Section
      className={[styles.textImage, styles[primary.usid]].join(" ")}
      style={{ backgroundColor: primary.background_color }}
    >
      <Container ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={fadeIn}
        >
          <Row>
            <Column columns={{ xs: 14, md: 7 }} offsets={{ md: 1 }}>
              <RichText render={primary.headline} />
            </Column>
            <Column columns={{ xs: 14, md: 4 }}>
              <RichText render={primary.text} />
            </Column>
          </Row>
          <Row>
            <Column columns={{ xs: 14, md: 11 }} offsets={{ md: 3 }}>
              <div className={styles.image}>
                <Picture image={primary.image} />
              </div>
            </Column>
          </Row>
        </motion.div>
      </Container>
    </Section>
  );
};

export default TextImage;
