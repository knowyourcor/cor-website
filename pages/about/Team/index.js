import Section from "../../../components/Section"
import { Container, Row, Column } from "../../../components/Grid"
import Paragraph from "../Paragraph"
import Carousel from "../Carousel"

import styles from "./team.module.scss"

const team = {
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
}

const fields = [
  {
    image: "/images/about/about-team-1.jpg",
    name: "Bob Messerschmidt",
    position: "Founder & CEO",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    image: "/images/about/about-team-2.jpg",
    name: "Stacey Reed",
    position: "M.D. Cardiology",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    image: "/images/about/about-team-3.jpg",
    name: "Ashley Jackson",
    position: "Mechanical Engineer",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    image: "/images/about/about-team-2.jpg",
    name: "Bob Messerschmidt",
    position: "Founder & CEO",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    image: "/images/about/about-team-1.jpg",
    name: "Stacey Reed",
    position: "M.D. Cardiology",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
]

export default function Index() {
  return (
    <Section className={[styles.sectionWrap].join(" ")}>
      <Container>
        <Row justify="space-between" align="center" textAlign={{ xs: "center", sm: "left" }}>
          <Column columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} className="custom__column">
            <h3>Our Team</h3>
          </Column>
          <Column columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} justify="center" >
            <Paragraph text={team.text} />
          </Column>
        </Row>
      </Container>
      <Carousel fields={fields} />
    </Section>
  )
}