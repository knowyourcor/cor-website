import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Button from "../../Button";
import Picture from "../../Picture";
import { fadeIn } from "../../../lib/variants";
import styles from "./textImage.module.scss";

const TextImage = ({ primary }) => {
  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });

  return (
    <Section
      className={styles.textImage}
      backgroundColor={primary.background_color}
    >
      <Container ref={ref}>
        {primary.headline[0].text && (
          <Row>
            <Column columns={{ xs: 14, md: 8 }} offsets={{ md: 1 }}>
              <motion.div
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                variants={fadeIn}
              >
                <RichText render={primary.headline} />
              </motion.div>
            </Column>
          </Row>
        )}
        <Row>
          <Column columns={{ xs: 14, md: 10 }} offsets={{ md: 1 }}>
            <Picture image={primary.image} classes={styles.image} />
          </Column>
        </Row>
        <Row>
          <Column columns={{ xs: 14, md: 6 }} offsets={{ md: 1 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeIn}
            >
              <RichText render={primary.text} />
              {primary.link && (
                <Button
                  linkData={primary.link}
                  labelData={primary.link_label}
                />
              )}
            </motion.div>
          </Column>
        </Row>
      </Container>
    </Section>
  );
};

export default TextImage;
