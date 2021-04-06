import { RichText } from "prismic-reactjs";

import Section from "../../Section";
import { Container } from "../../Grid";
import Picture from "../../Picture";

import styles from "./index.module.scss"

export default function Index({ primary }) {
  return (
    <Section className={styles.textDescriptionImage} align="center">
      <Container>
        <RichText render={primary.heading} />
        <RichText render={primary.sub_heading} />
      </Container>
      <div className={styles.image}>
        <Picture image={primary.image} />
      </div>
      <Container>
        <RichText render={primary.description} />
      </Container>
    </Section>
  )
}