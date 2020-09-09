import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import styles from "./textImage.module.scss";

// primary {
//   headline
//   text
//   image
//   background_color
//   alignment
//   overlap_text_and_image
// }

const TextImage = ({ primary }) => {
  // primary.overlap_text_and_image
  // primary.alignment
  return (
    <Section fullScreen backgroundColor={primary.background} align="center">
      <Container>
        <Row align="center" textAlign={{ xs: "center" }}>
          <Column columns={{ xs: 14 }}>
            <RichText render={primary.headline} />
          </Column>
        </Row>
        <Row align="center" textAlign={{ xs: "center" }}>
          <Column columns={{ xs: 14, sm: 7 }}>
            <RichText render={primary.text} />
          </Column>
          <Column columns={{ xs: 14, sm: 7 }}>
            <img
              src={primary.image.xxl.url}
              alt={primary.image.alt}
              className={styles.image}
            />
          </Column>
        </Row>
      </Container>
    </Section>
  );
};

export default TextImage;
