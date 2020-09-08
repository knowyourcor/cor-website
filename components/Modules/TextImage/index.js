import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import styles from "./textImage.module.scss";

const TextImage = ({ primary, background }) => {
  return (
    <Section fullScreen backgroundColor={background} align="center">
      <Container>
        <Row align="center" textAlign={{ xs: "center" }}>
          <Column columns={{ xs: 14, sm: 11 }} offsets={{ sm: 1 }}>
            <h3>{primary.headline[0].text}</h3>
          </Column>
        </Row>
      </Container>
    </Section>
  );
};

export default TextImage;
