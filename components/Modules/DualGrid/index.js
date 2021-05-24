import { RichText } from "prismic-reactjs";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Container, Row, Column } from "../../Grid";
import Section from "../../Section";
import Picture from "../../Picture";
import { fadeIn } from "../../../lib/variants";
import styles from "./dualGrid.module.scss";

export default function DualGrid({ primary }) {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <Section className={styles.dualGrid}>
      <Container ref={ref}>
        <Row align={{ md: "center" }}>
          <Column columns={{ xs: 14, sm: 6 }} offsets={{ md: 1 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeIn}
              className={styles.image}
            >
              <Picture image={primary.image} />
            </motion.div>
          </Column>
          <Column columns={{ xs: 14, sm: 6, md: 5 }} offsets={{ sm: 1 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeIn}
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
