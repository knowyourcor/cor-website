import { useRouter } from "next/router";
import { getLayout } from "../components/Layout/PageLayout";
import ErrorPage from "next/error";
import Head from "../components/Head";
import Section from "../components/Section";
import { Container, Row, Column } from "../components/Grid";
import Modules from "../components/Modules";
import { getPageData, getAllPagesWithSlug, getMenuData } from "../lib/api";

export default function Page({ pageData }) {
  const router = useRouter();
  if (!router.isFallback && !pageData?._meta?.uid) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      {router.isFallback ? (
        <>
          <Head title="Loading..." />
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
        </>
      ) : (
        <>
          <Head title={pageData?.meta_title} />
          <Modules pageData={pageData} />
        </>
      )}
    </>
  );
}

export async function getStaticPaths() {
  const allPages = await getAllPagesWithSlug();

  // If a page has a template, e.g. a page called about.js,
  // add the name to the array
  const hasPageTemplate = ["about"];

  // Remove pages that have a template from static paths
  const filterOutTemplates = allPages.filter(
    ({ node }) => !hasPageTemplate.includes(node?._meta?.uid)
  );

  // Create an array of paths to pass to static paths
  const allPaths = filterOutTemplates?.map(({ node }) => `/${node._meta.uid}`);

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

Page.getLayout = getLayout;
