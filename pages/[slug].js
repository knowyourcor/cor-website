import { useRouter } from "next/router";
import Head from "../components/Head";
import Section from "../components/Section";
import { Container, Row, Column } from "../components/Grid";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

// import styles from "../styles/Page.module.scss";

export default function Page() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Head title="Page Title" />
      <main>
        <Topbar />
        <Section>
          <Container>
            <Row align="center" textAlign={{ xs: "center", sm: "left" }}>
              <Column columns={{ xs: 14, sm: 12 }} offsets={{ sm: 1 }}>
                <h1>{slug}</h1>
                <p>Placeholder for catch all pages.</p>
              </Column>
            </Row>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
