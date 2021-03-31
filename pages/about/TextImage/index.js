import Section from "../../../components/Section";
import { Container, Row, Column } from "../../../components/Grid";
import Image from "../Image"
import Paragraph from "../Paragraph"

import styles from "./textImage.module.scss"

const dualGrid = {
  image: "/images/about/about-1.jpg",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
}

export default function Index() {
  return (
    <Section className={styles.textImageWrap}>
      <Container>
        <Row align="center" textAlign={{ xs: "center", sm: "left" }}>
          <Column className="custom__column" columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} justify="center">
            <Image image={dualGrid.image} width={753} height={805} />
          </Column>
          <Column columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} justify="center" >
            <h3 className={styles.title}>Helping you optimize your self health</h3>
            <Paragraph text={dualGrid.text} />
          </Column>
        </Row>
      </Container>
    </Section>
  )
}