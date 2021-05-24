import { RichText } from "prismic-reactjs";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";
import Section from "../../Section";
import { fadeIn } from "../../../lib/variants";
import styles from "./shopDataProgress.module.scss";

export default function Index({ primary }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <Section className={styles.dataProgress}>
      <Container ref={ref}>
        <Row>
          <Column columns={{ xs: 14, md: 7 }} offsets={{ md: 1 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeIn}
              className={styles.image}
            >
              <Picture image={primary.image} />
            </motion.div>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeIn}
              className={styles.content}
            >
              <RichText render={primary.text} />
            </motion.div>
          </Column>
          <Column columns={{ xs: 14, md: 4 }} offsets={{ md: 1 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeIn}
              className={styles.headline}
            >
              <p className={styles.tag}>{primary.tag}</p>
              <RichText render={primary.headline} />
            </motion.div>
            <div className={styles.screenshot}>
              <Picture image={primary.screenshot} />
            </div>
          </Column>
        </Row>
      </Container>
    </Section>
  );
}
