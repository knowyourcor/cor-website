import Head from "../components/Head";
import Section from "../components/Section";
import { Container, Row, Column } from "../components/Grid";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

// import styles from "../styles/Privacy.module.scss";

export default function Privacy() {
  return (
    <>
      <Head title="Privacy" />
      <main>
        <Topbar />
        <Section>
          <Container>
            <Row align="center" textAlign={{ xs: "center", sm: "left" }}>
              <Column columns={{ xs: 14, sm: 12 }} offsets={{ sm: 1 }}>
                <h1>Privacy</h1>
                <p>Placeholder for Privacy.</p>
              </Column>
            </Row>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
