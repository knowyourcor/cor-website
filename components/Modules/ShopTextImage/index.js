import { RichText } from "prismic-reactjs";
import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";

import styles from "./shopTextImage.module.scss";

const TextImage = ({ primary }) => {
  return (
    <Section className={styles.section} style={{ backgroundColor: primary.background_color }} align="center">
      <Container>
        {primary.headline[0].text && (
          <Row align="center" textAlign={{ xs: "left" }}>
            <Column columns={{ xs: 14, md: 8 }} offsets={{ md: 2 }} className="custom__column">
              <RichText render={primary.headline} />
            </Column>
            <Column columns={{ xs: 14, md: 4 }}>
              <RichText render={primary.text} />
            </Column>
          </Row>
        )}
      </Container>
      <div className={styles.imageWrap}>
        <Picture {...primary} classes={styles.image} />
      </div>
    </Section>
  );
};

export default TextImage;
