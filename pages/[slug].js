import { useRouter } from "next/router";
import Loading from "../components/Loading";
import Head from "../components/Head";
import { getLayout } from "../components/Layout/PageLayout";
import Modules from "../components/Modules";
import { getPageData, getAllPagesWithSlug, getMenuData } from "../lib/api";

export default function Page({ pageData }) {
  const router = useRouter();
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <>
      <Head
        title={pageData?.meta_title}
        description={pageData?.meta_description}
        image={pageData?.meta_image?.url}
      />
      <Modules pageData={pageData} />
    </>
  );
}

export async function getStaticPaths() {
  const allPages = await getAllPagesWithSlug();

  // If a page has a template, e.g. a page called about.js,
  // add the name to the array
  const hasPageTemplate = ["about"];

  // Remove pages that have a template from static paths
  const filterOutTemplates = allPages?.filter(
    ({ node }) => !hasPageTemplate.includes(node?._meta?.uid)
  );

  // Create an array of paths to pass to static paths
  const allPaths = filterOutTemplates?.map(({ node }) => `/${node._meta.uid}`);

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

  if (!pageData) {
    return {
      notFound: true,
    };
  }

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
