import Head from "../components/Head";
import Section from "../components/Section";
import { Container, Row, Column } from "../components/Grid";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

// import styles from "../styles/ShippingInfo.module.scss";

export default function ShippingInfo() {
  return (
    <>
      <Head title="Shipping Info" />
      <main>
        <Topbar />
        <Section>
          <Container>
            <Row align="center" textAlign={{ xs: "center", sm: "left" }}>
              <Column columns={{ xs: 14, sm: 12 }} offsets={{ sm: 1 }}>
                <h1>Shipping Info</h1>
                <p>Placeholder for Shipping Info.</p>
              </Column>
            </Row>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
