import { RichText } from "prismic-reactjs";
import Head from "../components/Head";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Section from "../components/Section";
import { Container, Row, Column } from "../components/Grid";
import Modules from "../components/Modules";
import Alert from "../components/Alert";

import { getPageData, getAllPagesWithSlug } from "../lib/api";

// import styles from "../styles/Page.module.scss";

export default function Page({ preview, pageData }) {
  return (
    <>
      <Head title={pageData.meta_title} />
      <Alert preview={preview} />
      <main>
        <Topbar />
        <Section>
          <Container>
            <Row align="center" textAlign={{ xs: "center", sm: "left" }}>
              <Column columns={{ xs: 14, sm: 12 }} offsets={{ sm: 1 }}>
                <RichText render={pageData.page_title} />
                {/* TODO hook this up to Module */}
                <RichText render={pageData.body[0].primary.text} />
              </Column>
            </Row>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const allPages = await getAllPagesWithSlug();
  return {
    paths:
      allPages?.map(({ node }) => {
        return { params: { slug: `${node._meta.uid}` } };
      }) || [],
    fallback: true,
  };
}

export async function getStaticProps({ preview = false, previewData, params }) {
  const pageData = await getPageData(params.slug, previewData);
  return {
    props: { preview, pageData },
    revalidate: 1,
  };
}
