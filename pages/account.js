import Head from "../components/Head";
import Section from "../components/Section";
import { Container, Row, Column } from "../components/Grid";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Alert from "../components/Alert";

import { getMenuData } from "../lib/api";

import Modules from "../components/Modules";

// import styles from "../styles/Account.module.scss";

export default function Account({
  preview,
  mainMenuData,
  footerMenuData,
  tertiaryMenuData,
}) {
  return (
    <>
      <Head title="Account" />
      <Alert preview={preview} />
      <main>
        <Navigation mainMenuData={mainMenuData} />
        <Section>
          <Container>
            <Row align="center" textAlign={{ xs: "center", sm: "left" }}>
              <Column columns={{ xs: 14, sm: 12 }} offsets={{ sm: 1 }}>
                <h1>Account</h1>
                <p>Placeholder for Account.</p>
              </Column>
            </Row>
          </Container>
        </Section>
      </main>
      <Footer
        footerMenuData={footerMenuData}
        tertiaryMenuData={tertiaryMenuData}
      />
    </>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const mainMenuData = await getMenuData("main-menu");
  const footerMenuData = await getMenuData("footer-menu");
  const tertiaryMenuData = await getMenuData("tertiary-menu");
  return {
    props: {
      preview,
      mainMenuData,
      footerMenuData,
      tertiaryMenuData,
    },
    revalidate: 1, // In seconds
  };
}
