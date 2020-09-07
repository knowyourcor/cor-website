import Head from "../components/Head";

import Section from "../components/Section";
import { Container, Row, Column } from "../components/Grid";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <>
      <Head title="Welcome" />

      <main className={styles.main}>
        <Topbar />
        <Section align="center">
          <Container>
            <Row align="center" textAlign={{ xs: "center", sm: "left" }}>
              <Column
                columns={{ xs: 14, sm: 11, md: 10 }}
                offsets={{ sm: 1, md: 1 }}
              >
                <h1>There’s more to health than steps & weight</h1>
              </Column>
            </Row>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
