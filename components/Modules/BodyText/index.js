import { RichText } from "prismic-reactjs";
import { useInView } from "react-intersection-observer";
import { Container, Row, Column } from "../../Grid";
import { fadeIn } from "../../../lib/variants";
import styles from "./text.module.scss";

const BodyText = ({ primary }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <Container ref={ref}>
      <Row>
        <Column columns={{ xs: 14, sm: 12, md: 8 }} offsets={{ sm: 1, md: 3 }}>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            variants={fadeIn}
            className={styles.text}
          >
            <RichText render={primary.text} />
          </motion.div>
        </Column>
      </Row>
    </Container>
  );
};

export default BodyText;
