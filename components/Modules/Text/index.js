import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import { RichText } from "prismic-reactjs";

import styles from "./text.module.scss";

const Text = ({ primary, background }) => {
  return (
    <Section fullScreen backgroundColor={background} align="center">
      <Container>
        <Row align="center" textAlign={{ xs: "center" }}>
          <Column columns={{ xs: 14, sm: 11 }} offsets={{ sm: 1 }}>
            <RichText render={primary.text} />
          </Column>
        </Row>
      </Container>
    </Section>
  );
};

export default Text;
