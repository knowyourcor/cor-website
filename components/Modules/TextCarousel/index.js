import { RichText } from "prismic-reactjs";

import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import TeamCarousel from "../../TeamCarousel"

import styles from "./index.module.scss"

export default function Index({ primary, fields }) {
  return (
    <Section style={{ backgroundColor: primary.background_color }} className={styles.textCarousel}>
      <Container>
        <Row justify="space-between" align="center" textAlign={{ xs: "left" }}>
          <Column columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} className="custom__column">
            <RichText render={primary.heading} />
          </Column>
          <Column columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} justify="center" >
            <RichText render={primary.text} />
          </Column>
        </Row>
      </Container>
      <TeamCarousel fields={fields} />
    </Section>
  )
}