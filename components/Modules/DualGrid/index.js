import { RichText } from "prismic-reactjs";

import Section from "../../Section";
import { Container, Row, Column } from "../../Grid";
import Picture from "../../Picture";

import styles from "./index.module.scss"

export default function Index({ primary }) {
  return (
    <Section className={styles.dualGrid}>
      <Container>
        <Row align="center" textAlign={{ xs: "left" }}>
          <Column className="custom__column" columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} justify="center">
            <Picture image={primary.image} />
          </Column>
          <Column columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} justify="center" >
            <RichText render={primary.heading} />
            <RichText render={primary.description} />
          </Column>
        </Row>
      </Container>
    </Section>
  )
}