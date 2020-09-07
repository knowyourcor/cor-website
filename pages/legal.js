import Head from "../components/Head";
import Section from "../components/Section";
import { Container, Row, Column } from "../components/Grid";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

// import styles from "../styles/Legal.module.scss";

export default function Legal() {
  return (
    <>
      <Head title="Legal" />
      <main>
        <Topbar />
        <Section>
          <Container>
            <Row align="center" textAlign={{ xs: "center", sm: "left" }}>
              <Column columns={{ xs: 14, sm: 12 }} offsets={{ sm: 1 }}>
                <h1>Legal</h1>
                <p>Placeholder for Legal.</p>
              </Column>
            </Row>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
