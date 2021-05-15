import { getLayout } from "../components/Layout/PageLayout";
import Head from "../components/Head";
import Modules from "../components/Modules";
import { getPageData, getPressData, getMenuData } from "../lib/api";
import Press from "../components/Press";

export default function About({ pageData, pressData }) {
  return (
    <>
      <Head title={pageData?.meta_title} />
      <Modules pageData={pageData} />
      <Press pressData={pressData} />
    </>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const pageData = await getPageData("about", previewData);
  const pressData = await getPressData();
  const mainMenuData = await getMenuData("main-menu");
  const footerMenuData = await getMenuData("footer-menu");
  const tertiaryMenuData = await getMenuData("tertiary-menu");
  return {
    props: {
      preview,
      pageData: pageData ?? null,
      pressData: pressData ?? null,
      mainMenuData: mainMenuData ?? null,
      footerMenuData: footerMenuData ?? null,
      tertiaryMenuData: tertiaryMenuData ?? null,
    },
    revalidate: 1,
  };
}

About.getLayout = getLayout;
