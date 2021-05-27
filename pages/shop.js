import Head from "../components/Head";
import { getLayout } from "../components/Layout/PageLayout";
import Modules from "../components/Modules";
import { getShopData, getMenuData } from "../lib/api";

export default function Shop({ pageData }) {
  return (
    <>
      <Head
        title={pageData?.meta_title}
        description={pageData?.meta_description}
      />
      <Modules pageData={pageData} />
    </>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const pageData = await getShopData(previewData);
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

Shop.getLayout = getLayout;
