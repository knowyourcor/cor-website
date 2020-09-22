import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";

import styles from "./text.module.scss";

const Text = ({ primary }) => {
  return (
    <Section align="center">
      <Container>
        <Row align="center">
          <Column columns={{ xs: 14, sm: 12 }} offsets={{ sm: 1 }}>
            <div className={styles.text}>
              <RichText render={primary.text} />
            </div>
          </Column>
        </Row>
      </Container>
    </Section>
  );
};

export default Text;
