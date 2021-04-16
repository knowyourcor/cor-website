import { RichText } from "prismic-reactjs";

import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";

import styles from "./index.module.scss";

export default function Index({ primary }) {
  return (
    <Section
      className={styles.textBackgroundImage}
      style={{ backgroundColor: primary.background_color }}
    >
      <Container>
        <Row>
          <Column columns={{ xs: 14, md: 6 }} offsets={{ md: 1, lg: 1 }} className="custom__column">
            <RichText render={primary.heading} />
            <RichText render={primary.text} />
          </Column>
        </Row>
      </Container>
      <div
        className={styles.imageWrap}
        style={{ backgroundImage: `url(${primary.background_image.url})` }}
      ></div>
    </Section>
  )
}