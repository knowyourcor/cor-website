import { RichText } from "prismic-reactjs";
import { Column, Container, Row } from "../../Grid";
import Picture from "../../Picture";
import Section from "../../Section";

import styles from "./index.module.scss"

export default function Index({ primary }) {
  return (
    <Section style={{ backgroundColor: primary.background_color }} className={styles.dataProgress}>
      <Container>
        <div className={styles.contentWrap}>
          <Row align="center">
            <Column columns={{ xs: 14, md: 7 }} offsets={{ md: 1 }} className="custom__column">
              <div className={styles.imageDetailsHolder}>
                <Picture image={primary.big_image} />
                <RichText render={primary.text_heading} />
                <RichText render={primary.text} />
              </div>
            </Column>
            <Column columns={{ xs: 14, md: 5 }} offsets={{ md: 1 }}>
              <span>{primary.tag}</span>
              <RichText render={primary.heading} />
              <div className={styles.overflowImage}>
                <Picture image={primary.overflow_image} />
              </div>
            </Column>
          </Row>
        </div>
      </Container>
    </Section>
  )
}