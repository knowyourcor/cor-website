import Layout from "../components/Layout"
import Section from "../components/Section"
import { Container, Row, Column } from "../components/Grid";
import Paragraph from "../components/Paragraph"
import Image from "../components/Image";
import TeamCarousel from "../components/TeamCarousel"
import FeaturedPress from "../components/FeaturedPress"
// import Hero from "./Hero"
// import TextImage from "./TextImage"
// import Team from "./Team"

import styles from "../styles/about.module.scss"

const hero = {
  image: "/images/about/about-hero.jpg",
  text: "Lorem ipsum. Until now, blood data science only existed in the medical landscape - to diagnose disease and sell you medicine. We believe that’s “sick care” rather than health care. COR is for those of us who are on offense about our health, who demand more than generalized advice and misguided intuition. We deserve accurate, science-based self-knowledge to maintain, adjust, manage or maximize our health on our terms."
}

const dualGrid = {
  image: "/images/about/about-1.jpg",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
}

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

export default function Index({
  preview
}) {
  return (
    <Layout
      title="About Us"
      preview={preview}
    >
      <Section className={styles.hero}>
        <Container>
          <h1>About COR</h1>
          <h2>We are on the offence of health</h2>
        </Container>
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
      <Section className={styles.textImageWrap}>
        <Container>
          <Row align="center" textAlign={{ xs: "center", sm: "left" }}>
            <Column className="custom__column" columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} justify="center">
              <Image image={dualGrid.image} width={753} height={805} />
            </Column>
            <Column columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} justify="center" >
              <h3>Helping you optimize your self health</h3>
              <Paragraph text={dualGrid.text} />
            </Column>
          </Row>
        </Container>
      </Section>
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
        <TeamCarousel fields={fields} />
      </Section>
      {/* <Team /> */}
      <FeaturedPress />
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  return {
    props: {
      preview
    },
    revalidate: 1, // In seconds
  };
}