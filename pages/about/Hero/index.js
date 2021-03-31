import Section from "../../../components/Section"
import { Container, Row, Column } from "../../../components/Grid"

import Heading from "../Heading"
import Image from "../Image"
import Paragraph from "../Paragraph"

// import styles from "../about.module.scss"
import styles from "./hero.module.scss"

const hero = {
  image: "/images/about/about-hero.jpg",
  text: "Lorem ipsum. Until now, blood data science only existed in the medical landscape - to diagnose disease and sell you medicine. We believe that’s “sick care” rather than health care. COR is for those of us who are on offense about our health, who demand more than generalized advice and misguided intuition. We deserve accurate, science-based self-knowledge to maintain, adjust, manage or maximize our health on our terms."
}

export default function Index() {
  return (
    <Section className={styles.hero}>
      <Heading />
      <Image image={hero.image} width={1336} height={952} />
      <Container>
        <Paragraph
          className={styles.customWidth}
          text={hero.text}
        />
        <Row align="center" textAlign={{ xs: "center", sm: "left" }}>
          <Column columns={{ xs: 14, sm: 12 }} offsets={{ sm: 1 }}>
          </Column>
        </Row>
      </Container>
    </Section>
  )
}