import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "../components/Head";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Section from "../components/Section";
import { Container, Row, Column } from "../components/Grid";
import Modules from "../components/Modules";
import Alert from "../components/Alert";

import { getPageData, getAllPagesWithSlug, getMenuData } from "../lib/api";

// import styles from "../styles/Page.module.scss";

export default function Page({
  preview,
  pageData,
  mainMenuData,
  footerMenuData,
  tertiaryMenuData,
}) {
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
            <Topbar mainMenuData={mainMenuData} />
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
          <Footer
            footerMenuData={footerMenuData}
            tertiaryMenuData={tertiaryMenuData}
          />
        </>
      ) : (
        <>
          <Head title={pageData?.meta_title} />
          <Alert preview={preview} />
          <main>
            <Topbar mainMenuData={mainMenuData} />
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
          <Footer
            footerMenuData={footerMenuData}
            tertiaryMenuData={tertiaryMenuData}
          />
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
  const allPaths = allPages?.map(({ node }) => `/${node._meta.uid}`);
  return {
    paths: allPaths || [],
    fallback: false,
  };
}

export async function getStaticProps({ preview = false, previewData, params }) {
  const pageData = await getPageData(params.slug, previewData);
  const mainMenuData = await getMenuData("main-menu");
  const footerMenuData = await getMenuData("footer-menu");
  const tertiaryMenuData = await getMenuData("tertiary-menu");
  console.log("pageData: ", pageData);
  console.log("mainMenuData: ", mainMenuData);
  return {
    props: {
      preview,
      pageData: pageData ?? null,
      mainMenuData: mainMenuData ?? null,
      footerMenuData: footerMenuData ?? null,
      tertiaryMenuData: tertiaryMenuData ?? null,
    },
    revalidate: 5,
  };
}
