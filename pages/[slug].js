import { useRouter } from "next/router";
import ErrorPage from "next/error";
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
  const router = useRouter();
  if (!router.isFallback && !pageData?._meta?.uid) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      {router.isFallback ? (
        <>
          <Head title="Loading..." />
          <main>
            <Topbar />
            <Section>
              <Container>
                <Row>
                  <Column
                    columns={{ xs: 14, sm: 12, md: 10 }}
                    offsets={{ sm: 1, md: 2 }}
                  >
                    <h2>Loading…</h2>
                  </Column>
                </Row>
              </Container>
            </Section>
          </main>
          <Footer />
        </>
      ) : (
        <>
          <Head title={pageData?.meta_title} />
          <Alert preview={preview} />
          <main>
            <Topbar />
            <Section>
              <Container>
                <Row>
                  <Column
                    columns={{ xs: 14, sm: 12, md: 10 }}
                    offsets={{ sm: 1, md: 2 }}
                  >
                    <Modules pageData={pageData} />
                  </Column>
                </Row>
              </Container>
            </Section>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

// export async function getStaticPaths() {
//   const allPages = await getAllPagesWithSlug();
//   return {
//     paths:
//       allPages?.map(({ node }) => {
//         return { params: { slug: `${node._meta.uid}` } };
//       }) || [],
//     fallback: true,
//   };
// }

export async function getStaticPaths() {
  const allPages = await getAllPagesWithSlug();
  return {
    paths: allPages?.map(({ node }) => `/${node._meta.uid}`) || [],
    fallback: true,
  };
}

export async function getStaticProps({ preview = false, previewData, params }) {
  const pageData = await getPageData(params.slug, previewData);
  return {
    props: { preview, pageData: pageData ?? null },
    revalidate: 5,
  };
}
