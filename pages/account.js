import Head from "../components/Head";
import { getLayout } from "../components/Layout/PageLayout";
import Section from "../components/Section";
import { Container, Row, Column } from "../components/Grid";
import { getMenuData } from "../lib/api";

export default function Account() {
  return (
    <>
      <Head title="Account" />
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

Account.getLayout = getLayout;
