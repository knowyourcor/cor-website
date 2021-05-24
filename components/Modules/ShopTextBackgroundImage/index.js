import { RichText } from "prismic-reactjs";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Picture from "../../Picture";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import { fadeIn } from "../../../lib/variants";
import styles from "./shopTextBackgroundImage.module.scss";

export default function ShopTextBackgroundImage({ primary }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <Section
      className={styles.textBackgroundImage}
      style={{ backgroundColor: primary.background_color }}
    >
      <Container ref={ref}>
        <Row align={{ xs: "center" }}>
          <Column columns={{ xs: 14, md: 4 }} offsets={{ md: 1 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeIn}
              className={styles.content}
            >
              <RichText render={primary.headline} />
              <RichText render={primary.text} />
            </motion.div>
          </Column>
          <Column columns={{ xs: 14, md: 9 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeIn}
              className={styles.image}
            >
              <Picture image={primary.image} />
            </motion.div>
          </Column>
        </Row>
      </Container>
    </Section>
  );
}
