import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";
import styles from "./shopTextImage.module.scss";

const TextImage = ({ primary }) => {
  return (
    <Section backgroundColor={primary.background_color} align="center">
      <Container>
        {primary.headline[0].text && (
          <Row align="center" textAlign={{ xs: "center" }}>
            <Column columns={{ xs: 14, md: 10 }} offsets={{ md: 2 }}>
              <RichText render={primary.headline} />
            </Column>
          </Row>
        )}
        <Row align="center" textAlign={{ xs: "left" }}>
          <Column columns={{ xs: 14, md: 9 }} offsets={{ md: 1 }}>
            <Picture {...primary} classes={styles.image} />
          </Column>

          <Column columns={{ xs: 14, md: 3 }}>
            <RichText render={primary.text} />
          </Column>
        </Row>
      </Container>
    </Section>
  );
};

export default TextImage;
