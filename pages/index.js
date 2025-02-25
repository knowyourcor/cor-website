import Head from "../components/Head";
import { getLayout } from "../components/Layout/PageLayout";
import Modules from "../components/Modules";
import TextMultiVideo from "../components/Modules/TextMultiVideo";

import { getHomepageData, getMenuData } from "../lib/api";

export default function Homepage({ pageData }) {
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

export async function getStaticProps({ preview = false, previewData }) {
  const pageData = await getHomepageData(previewData);
  const mainMenuData = await getMenuData("main-menu");
  const footerMenuData = await getMenuData("footer-menu");
  const tertiaryMenuData = await getMenuData("tertiary-menu");
  return {
    props: {
      preview,
      pageData,
      mainMenuData,
      footerMenuData,
      tertiaryMenuData,
    },
    revalidate: 1, // In seconds
  };
}

Homepage.getLayout = getLayout;
