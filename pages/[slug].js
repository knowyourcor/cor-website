import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "../components/Head";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Section from "../components/Section";
import { Container, Row, Column } from "../components/Grid";
import Modules from "../components/Modules";
import Alert from "../components/Alert";
import Layout from "../components/Layout"

import { getPageData, getAllPagesWithSlug, getMenuData } from "../lib/api";

import FeaturedPress from "../components/FeaturedPress"

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

  let title = pageData?.meta_title.toLowerCase()

  return (
    <>
      {router.isFallback ? (
        <>
          <Head title="Loading..." />
          <main>
            <Navigation mainMenuData={mainMenuData} />
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
        <Layout
          classNameVal={["page__layout", title].join(" ")}
          title={pageData?.meta_title}
          preview={preview}
          mainMenuData={mainMenuData}
          footerMenuData={footerMenuData}
          tertiaryMenuData={tertiaryMenuData}
        >
          <Modules pageData={pageData} />
          {pageData?.featured_press && <FeaturedPress />}

        </Layout>
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
    fallback: true,
  };
}

export async function getStaticProps({ preview = false, previewData, params }) {
  const pageData = await getPageData(params.slug, previewData);
  const mainMenuData = await getMenuData("main-menu");
  const footerMenuData = await getMenuData("footer-menu");
  const tertiaryMenuData = await getMenuData("tertiary-menu");
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
