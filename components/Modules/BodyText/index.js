import { RichText } from "prismic-reactjs";
import { useInView } from "react-intersection-observer";

import { Container, Row, Column } from "../../Grid";

import styles from "./text.module.scss";

const BodyText = ({ primary }) => {
  return (
    <Container>
      <Row>
        <Column columns={{ xs: 14, sm: 12, md: 8 }} offsets={{ sm: 1, md: 3 }}>
          <div className={styles.text}>
            <RichText render={primary.text} />
          </div>
        </Column>
      </Row>
    </Container>
  );
};

export default BodyText;
