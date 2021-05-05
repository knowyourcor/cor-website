import Head from "../components/Head";
import { getLayout } from "../components/Layout/PageLayout";
import { Container, Row, Column } from "../components/Grid";
import { getMenuData } from "../lib/api";
import styles from "../styles/Error.module.scss";

export default function Error() {
  return (
    <>
      <Head title="Error" />
      <section className={styles.error}>
        <Container>
          <Row align="center" textAlign={{ xs: "center", sm: "left" }}>
            <Column columns={{ xs: 14, sm: 12 }} offsets={{ sm: 1 }}>
              <h1>404 - Page Not Found</h1>
            </Column>
          </Row>
        </Container>
      </section>
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

Error.getLayout = getLayout;
